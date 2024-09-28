# HackYeah 2024

## Cloud Function
### Create service account for cloud function
```
gcloud iam service-accounts create cloud-functions-sa
```

```
gcloud projects add-iam-policy-binding hackyeah-2024 \
  --member="serviceAccount:cloud-functions-sa@hackyeah-2024.iam.gserviceaccount.com" \
  --role="roles/cloudfunctions.invoker"
```

```
gcloud functions deploy hello_world \
    --runtime python39 \
    --trigger-http \
    --allow-unauthenticated \
    --service-account cloud-functions-sa@hackyeah-2024.iam.gserviceaccount.com
```

### Trigger Cloud Function locally
```
pip install -r .\server\requirements.txt
```

```
functions-framework --target=get_prompt
```

bash
```
curl -X POST http://localhost:8080 -H "Content-Type: application/json" -d '{"message": "Hello from the client!"}'
```

### API Docs

GET http://127.0.0.1:8085?level=[A1|A2|B1|B2]&from=[pl|en|us]&to=[pl|en|us]

Sample response
```
{
    "question": "Conjugate the verb \"hacer\" in the present tense for all the pronouns."
}
```

```
{
    "question": "¿Cuáles son tus pasatiempos favoritos y por qué te gustan tantas?"
}
```

POST http://127.0.0.1:8085

Sample body 
```
{
    "prompt": "¿Cual es tu deporte favorito y por que?",
    "level": "C1",
    "from": "pl",
    "to": "es",
    "response": "Mi deporte favorito es futbol porque me gusta correr"
}
```
Sample response
```
{
    "evaluation": "invalid: Odpowiedź jest zbyt prosta i nie spełnia wymagań poziomu C1. Brakuje głębszej analizy oraz bardziej złożonych struktur gramatycznych. \n\nPrzykład poprawy odpowiedzi: \"Mi deporte favorito es el fútbol porque disfruto no solo de correr, sino también de la estrategia y el trabajo en equipo que implica. Además, me encanta la emoción que se vive durante los partidos.\""
}
```