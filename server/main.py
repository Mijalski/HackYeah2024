import random
from io import BytesIO

from flask import Request, Response, jsonify
from google.cloud import secretmanager
from langchain.schema import HumanMessage
from langchain_openai import ChatOpenAI
from openai import OpenAI


def fetch_openai_api_key():
    client = secretmanager.SecretManagerServiceClient()
    response = client.access_secret_version(
        name="projects/hackyeah-2024/secrets/OPENAI_API_KEY/versions/latest"
    )
    return response.payload.data.decode("UTF-8")


def get_prompt(request: Request):
    llm = ChatOpenAI(
        model_name="gpt-4o-mini",
        openai_api_key=fetch_openai_api_key(),
        temperature=1.55,
        max_tokens=100,
    )

    from_lang = request.args.get("from", "pl")
    to_lang = request.args.get("to", "en")
    level = request.args.get("level", "A1")

    prompt_options = [
        f"""
        Generate a {level} level small talk question for language learning. 
        The question should be in {to_lang}, and the context is that the learner's native language is {from_lang}. 
        Make sure to return only the question and nothing else.
        """,

        f"""
        I would like you to generate a translation request for a small talk question.
        The difficulty level of the question should be '{level}'.
        Establish the source language based on '{from_lang}'.
        Establish the target language based on '{to_lang}'.
        The question should originate in the source language and should be translated into target language.

        Here are your instructions:
        - Automatically establish [Full Target Language Name In Source Language] (for example, en is english, pl is polish)
        - Start your response with: 'Please translate to [Full Target Language Name In Source Language]:' phrase in {from_lang}.
        - Only return the small talk question and nothing else.
        - Ensure the response follows the format mentioned above.

        Now, ask the user to translate a small talk question from {from_lang} to {to_lang}.
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

    selected_prompt = random.choice(prompt_options)

    prompt = HumanMessage(content=selected_prompt)
    response = llm([prompt])

    response = jsonify({"question": response.content})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


def post_evaluation(request: Request):
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)
    
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
        max_tokens=100,
    )

    evaluation_prompt = (
        f"Evaluate the following response based on the task given: "
        f"Task: {original_prompt}. Response: {user_response}. Response should be in {to_lang}. "
        f"The evaluation should be done in {from_lang} and should consider the language level {level}. "
        f"For levels A1 and A2, allow for simpler sentences and some minor errors if they do not hinder understanding. "
        f"Consider the correctness of the response in {to_lang}, translation accuracy if applicable, correct verb conjugation, "
        f"and whether it appropriately matches the task requirements. "
        f"Return 'valid' if the response is acceptable, considering the language level, "
        f"otherwise return 'invalid' with a brief reason in the {from_lang} language. "
        f"Provide an example of how to correct the response if needed."
    )

    evaluation_message = HumanMessage(content=evaluation_prompt)
    evaluation_response = llm([evaluation_message])

    evaluation_result = evaluation_response.content

    response = jsonify({"evaluation": evaluation_result})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


def post_read_prompt(request: Request):
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
