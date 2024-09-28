from flask import Request, jsonify
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import os


def hello_world(request: Request):
    openai_api_key = os.getenv("OPENAI_API_KEY")

    llm = ChatOpenAI(
        model_name="gpt-4o-mini",
        openai_api_key=openai_api_key,
        temperature=0.7,
        max_tokens=100,
    )

    prompt = HumanMessage(content="Explain the significance of data engineering in AI workflows.")

    response = llm([prompt])

    return jsonify({"response": response.content})
