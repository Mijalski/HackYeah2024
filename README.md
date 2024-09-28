# HackYeah 2024

## Operations
### Create service account for cloud function
```
gcloud iam service-accounts create cloud-functions-sa
```

```
gcloud projects add-iam-policy-binding hackyeah-2024 \
  --member="serviceAccount:cloud-functions-sa@hackyeah-2024.iam.gserviceaccount.com" \
  --role="roles/cloudfunctions.invoker"
```


### Trigger Cloud Function locally
```
pip install -r .\server\requirements.txt
```

```
functions-framework --target=get_prompt
```

### Deploy Cloud Function
```
gcloud functions deploy post_read_prompt `
    --runtime python312 `
    --trigger-http `
    --allow-unauthenticated `
    --service-account cloud-functions-sa@hackyeah-2024.iam.gserviceaccount.com `
    --region=europe-central2 `
    --entry-point post_read_prompt
```


## API Docs

Get task:
GET https://europe-central2-hackyeah-2024.cloudfunctions.net/get_prompt?level=[A1|A2|B1|B2]&from=[pl|en|us]&to=[pl|en|us]

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

Evaluate response:
POST hhttps://europe-central2-hackyeah-2024.cloudfunctions.net/post_evaluation

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

Text to speech:
POST hhttps://europe-central2-hackyeah-2024.cloudfunctions.net/post_read_prompt

Sample body 
```
{
    "prompt": "Masło boi się spać z innymi, to pipa"
}
```