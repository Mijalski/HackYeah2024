import os

from flask import Request, jsonify
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage


def hello_world(request: Request):
    openai_api_key = os.getenv("OPENAI_API_KEY")

    llm = ChatOpenAI(
        model_name="gpt-4o-mini",
        openai_api_key=openai_api_key,
        temperature=0.7,
        max_tokens=100,
    )

    request_json = request.get_json()
    prompt_text = request_json["prompt"]

    prompt = HumanMessage(
        content=prompt_text
    )

    response = llm([prompt])

    return jsonify({"response": response.content})
