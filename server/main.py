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
        temperature=1.55,
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
        f"Make sure to return only the question and nothing else. Start the answer with Please translate:",

        f"Ask the user to translate a word they might need to learn at {level} level from {from_lang} to {to_lang}. "
        f"Make sure to return only the task and nothing else.",

        f"Ask the user to conjugate a common verb they might need to learn at {level} level in {to_lang}. "
        f"Make sure to return only the task and nothing else."
    ]

    selected_prompt = random.choice(prompt_options)

    prompt = HumanMessage(content=selected_prompt)
    response = llm([prompt])

    return jsonify({"question": response.content})


def post_evaluation(request: Request):
    data = request.get_json()
    original_prompt = data.get('prompt')
    level = data.get('level', 'A1')
    from_lang = data.get('from', 'en')
    to_lang = data.get('to', 'en')
    user_response = data.get('response')

    openai_api_key = os.getenv("OPENAI_API_KEY")

    llm = ChatOpenAI(
        model_name="gpt-4o-mini",
        openai_api_key=openai_api_key,
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

    return jsonify({"evaluation": evaluation_result})