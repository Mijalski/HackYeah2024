import random
from io import BytesIO
from typing import Tuple, Union

from flask import Request, Response, jsonify
from google.cloud import secretmanager
from langchain.schema import HumanMessage
from langchain_openai import ChatOpenAI
from openai import OpenAI


def fetch_openai_api_key() -> str:
    client = secretmanager.SecretManagerServiceClient()
    response = client.access_secret_version(
        name="projects/hackyeah-2024/secrets/OPENAI_API_KEY/versions/latest"
    )
    return response.payload.data.decode("UTF-8")


def handle_cors_for_options_method(request: Request) -> Union[None, Tuple[str, int, dict]]:
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }
        return ("", 204, headers)


def get_prompt(request: Request) -> Response:
    llm = ChatOpenAI(
        model_name="gpt-4o",
        openai_api_key=fetch_openai_api_key(),
        temperature=1.3,
        max_tokens=100,
    )

    from_lang = request.args.get("from", "pl")
    to_lang = request.args.get("to", "en")
    level = request.args.get("level", "A1")

    prompt_options = [
        f"""
        Generate a unique and creative {level} level small talk question for language learning in {to_lang}. 
        Tailor the complexity of the question according to the specified level:
        - **A1 (Beginner):** Ask very simple, one-word answerable questions. These should be straightforward, about familiar topics like daily routines, food, colors, or personal preferences. For example, "What's your favorite color?" or "How do you say 'apple' in {from_lang}?"
        - **A2 (Elementary):** Make the question a bit more complex, but still easily answerable with a short sentence. These questions should cover familiar contexts but may ask for slightly more information. For example, "What do you like to do on weekends?"
        - **B1 (Intermediate):** Ask for more detail, involving simple opinions or descriptions. These questions should require longer responses but still be within everyday situations. For example, "Can you describe your ideal vacation?"
        - **B2 (Upper Intermediate):** Ask more in-depth questions that encourage reflection or explanation. These questions could involve describing experiences, sharing thoughts, or explaining reasoning. For example, "What challenges do you face when learning a new language?"
        - **C1 (Advanced):** Pose complex, open-ended questions that invite discussion or debate. These questions could explore abstract ideas, hypotheticals, or cultural comparisons. For example, "How do you think technology will shape the future of education?" or "Can you discuss the cultural differences between {to_lang} speaking countries and your own?"

        Prioritize creativity and avoid trivial or overly simple topics. Focus on fun, engaging prompts that are likely to encourage interaction and interest.
        Avoid repeating questions that have been generated before, and vary the topics to keep the conversation fresh and engaging.
        Return the question only, without any extra information, so it appears as a natural conversation starter.
        """,

        f"""
        I would like you to generate a translation request for a small talk question.
        The difficulty level of the question should be '{level}'.
        Source language is '{from_lang}'.
        Target language is '{to_lang}'.
        The question should originate in the source language and should be translated into target language.

        Formulate an inquiry to the user to translate the small talk question from {from_lang} language to {to_lang} language.
        Inquiry should be in {from_lang} language.
        Question should be in {from_lang} language inside double quotes.
        """,

        f"""
        Ask the user to translate a word they might need to learn at {level} level from {from_lang} to {to_lang}.
        Ensure the task is returned in the language of the word to be translated, {from_lang}.
        Provide only the translation task without additional explanation.
        Automatically establish [FULL LANGUAGE NAMED BASED ON {to_lang}] (for example, en is english, pl is polish)

        Examples:
        1) If the word to translate is in Polish, the question should look like:
        Proszę przetłumacz słowo "doskonały" na język angielski.

        2) If the word to translate is in English, the question should look like:
        Please translate the word "love" to polish.
        """,

        f"""
        Ask the user to conjugate a common verb they might need to learn at {level} level in {to_lang}. 
        Make sure to return only the task and nothing else.
        Return the task in {to_lang} language. 
        Every word in the task statement should be in {to_lang}.
        """,
    ]

    # In the initial version, idx is set to 0 instead of using random selection
    # to focus on the selected functionality
    # idx = random.randint(0, len(prompt_options) - 1)
    idx = 0
    selected_prompt = prompt_options[idx]

    prompt = HumanMessage(content=selected_prompt)
    response = llm([prompt])

    response = jsonify({"question": response.content, "prompt_type": idx})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


def post_evaluation(request: Request) -> Response:
    handle_cors_for_options_method(request)

    data = request.get_json()
    original_prompt = data.get("prompt")
    level = data.get("level", "A1")
    from_lang = data.get("from", "en")
    to_lang = data.get("to", "en")
    user_response = data.get("response")

    llm = ChatOpenAI(
        model_name="gpt-4o-mini",
        openai_api_key=fetch_openai_api_key(),
        temperature=0.1,
        max_tokens=300,
    )

    evaluation_prompt = f"""
        Evaluate if for a given question in {to_lang} language:
        ```
        {original_prompt}
        ```
        the answer
        ```
        {user_response} 
        ```
        would be proper.
        Assume the response was written by a person that primarly speaks {from_lang} and is learning {to_lang} currently
        at the level {level}. For lower levels like A1, A2 allow for mistakes, but for more advanced levels
        provide proper feedback. 
        For A1 accept one word answers. For A2 be a bit more strict and for higher levels do demand more.
        For responses that are below expectations return an explanation prefixed by Invalid. otherwise
        return Valid. Provide the feedback in {from_lang}
    """

    evaluation_message = HumanMessage(content=evaluation_prompt)
    evaluation_response = llm([evaluation_message])

    evaluation_result = evaluation_response.content

    valid = False
    if evaluation_result.startswith("Valid"):
        valid = True

    evaluation_result = evaluation_result.replace("Invalid. ", "")

    response = jsonify({"evaluation": evaluation_result, "isValid": valid})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


def post_read_prompt(request: Request) -> Response:
    handle_cors_for_options_method(request)

    client = OpenAI(api_key=fetch_openai_api_key())

    try:
        data = request.get_json()
        if not data or "prompt" not in data:
            return jsonify({"error": "Invalid request. 'prompt' is required."}), 400

        original_prompt = data["prompt"]
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=original_prompt,
        )

        audio_content = response.content  # Access the binary content directly
        audio_stream = BytesIO(audio_content)
        audio_stream.seek(0)

        response = Response(
            audio_stream,
            mimetype="audio/mpeg",
            headers={"Content-Disposition": "attachment; filename=speech.mp3"},
        )
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    except Exception as e:
        return jsonify({"error": str(e)}), 500
