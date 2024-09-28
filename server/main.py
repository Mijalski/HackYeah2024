import os
import random

from flask import Request, jsonify
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage

def get_prompt(request: Request):
    openai_api_key = os.getenv("OPENAI_API_KEY")

    llm = ChatOpenAI(
        model_name="gpt-4o-mini",
        openai_api_key=openai_api_key,
        temperature=1.5,
        max_tokens=100,
    )

    from_lang = request.args.get('from', 'pl')
    to_lang = request.args.get('to', 'en')
    level = request.args.get('level', 'A1')

    prompt_options = [
        f"Generate a {level} level small talk question for language learning. "
        f"The question should be in {to_lang}, and the context is that the learner's native language is {from_lang}. "
        f"Make sure to return only the question and nothing else.",

        f"Ask the user to translate a {level} level small talk question from their native language {from_lang} to {to_lang}. "
        f"Make sure to return only the question and nothing else.",

        f"Ask the user to translate a word they might need to learn at {level} level from {from_lang} to {to_lang}. "
        f"Make sure to return only the task and nothing else.",

        f"Ask the user to conjugate a common verb they might need to learn at {level} level in {to_lang}. "
        f"Make sure to return only the task and nothing else."
    ]

    selected_prompt = random.choice(prompt_options)

    # Create the HumanMessage prompt with the selected template
    prompt = HumanMessage(content=selected_prompt)
    response = llm([prompt])

    # Return the generated question or task
    return jsonify({"question": response.content})
