import os

from flask import Request, jsonify
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage


def hello_world(request: Request):
    openai_api_key = os.getenv("OPENAI_API_KEY")

    llm = ChatOpenAI(
        model_name="gpt-4o-mini",
        openai_api_key=openai_api_key,
        temperature=1.5,
        max_tokens=100,
    )

    from_lang = request.args.get('from', 'en')
    to_lang = request.args.get('to', 'en')
    level = request.args.get('level', 'A1')
    prompt = HumanMessage(
        content=f"Generate a {level} level small talk question for language learning. "
                f"The question should be in {to_lang}, and the context is that the learner's native language is {from_lang}."
                f"Make sure to return only the question and nothing else."
    )
    response = llm([prompt])
    return jsonify({"question": response.content})
