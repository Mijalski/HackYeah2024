# Lingoforest - Language Learning App

This project is developed for **HackYeah 2024** and focuses on creating a language learning app that uses **Google Cloud Functions** as a backend to generate language tasks and evaluate user responses. The frontend is built using **React**.
The app also features a text-to-speech capability.


## Quickstart
### Prerequisites

- Google Cloud project with enabled billing
- `gcloud` CLI installed and authenticated to the project.
- Python installed (version 3.12 or compatible).


### Set up a custom service account for Cloud Functions

1. **Assign necessary variables:**
    ```bash
    $SA_NAME="cloud-functions-sa"
    $PROJECT_ID="hackyeah-2024"
    ```

2. **Create the service account:**
    ```bash
    gcloud iam service-accounts create $SA_NAME
    ```

3. **Bind the appropriate roles to the service account:**
    
    For Cloud Functions invocation:
    ```bash
    gcloud projects add-iam-policy-binding $PROJECT_ID \
      --member="serviceAccount:$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
      --role="roles/cloudfunctions.invoker"
    ```

    For Secret Manager access:
    ```bash
    gcloud projects add-iam-policy-binding $PROJECT_ID \
      --member="serviceAccount:$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
      --role="roles/secretmanager.secretAccessor"
    ```

### Set up an OpenAI API key

1. **Generate an OpenAI API key:**
   
   Visit the [OpenAI API Keys page](https://platform.openai.com/api-keys) to create a new API key for accessing OpenAI services.

2. **Store the OpenAI API key in Google Cloud Secret Manager:**

   After generating the key, add it to Google Cloud Secret Manager for secure storage. You can do this through the Google Cloud Console:

   1. Go to the [Secret Manager page](https://console.cloud.google.com/security/secret-manager) in Google Cloud Console.
   2. Click **Create Secret**.
   3. Enter `OPENAI_API_KEY` as the name of the secret.
   4. In the **Secret Value** field, paste your OpenAI API key.
   5. Click **Create** to securely store the secret.


### Set up local environment

1. **Install the required dependencies:**
    ```bash
    pip install -r .\server\requirements.txt
    ```
2. **Set the function name and start the local development server:**
    ```bash
    $FUNCTION_NAME="get_prompt"
    functions-framework --target=$FUNCTION_NAME
    ```

### Deploy Cloud Function
```bash
gcloud functions deploy $FUNCTION_NAME \
    --runtime python312 \
    --trigger-http \
    --allow-unauthenticated \
    --service-account cloud-functions-sa@hackyeah-2024.iam.gserviceaccount.com \
    --region=europe-central2 \
    --entry-point $FUNCTION_NAME
```

## API Documentation

### Get Task
**Description:** Generates a language task based on the language level and translation preferences.

**Method:** `GET`

**Endpoint:** https://europe-central2-hackyeah-2024.cloudfunctions.net/get_prompt


**Query Parameters:**
- `level`: Language level, choose from `A1`, `A2`, `B1`, or `B2`.
- `from`: Source language.
- `to`: Target language.

**Sample Request:** 
```
https://europe-central2-hackyeah-2024.cloudfunctions.net/get_prompt?level=A2&from=polish&to=english
```

**Sample Response:**
```json
{
    "prompt_type": 0,
    "question": "What's a traditional celebration or festival in your culture, and how do you usually celebrate it?"
}
```

### Evaluate Response
**Description:** Submits a user's response for evaluation based on language level and correctness.

**Method:** `POST`

**Endpoint:** https://europe-central2-hackyeah-2024.cloudfunctions.net/post_evaluation


**Sample Request Body:**
```json
{
    "prompt": "¿Cual es tu deporte favorito y por qué?",
    "level": "C1",
    "from": "pl",
    "to": "es",
    "response": "Mi deporte favorito es futbol porque me gusta correr"
}
```


**Sample Response:**
```json
{
    "evaluation": "Odpowiedź jest zbyt prosta i nie spełnia wymagań poziomu C1. Brakuje głębszej analizy oraz bardziej złożonych struktur gramatycznych.\n\nPrzykład poprawnej odpowiedzi: 'Mi deporte favorito es el fútbol porque disfruto no solo de correr, sino también de la estrategia y el trabajo en equipo que implica. Además, me encanta la emoción que se vive durante los partidos.'"
}
```

### Text to Speech
**Description:** Converts a given prompt into spoken language.

**Method:** `POST`

**Endpoint:** https://europe-central2-hackyeah-2024.cloudfunctions.net/post_read_prompt


**Sample Request Body:**
```json
{
    "prompt": "Michał jest właścicielem jednego kota i dwóch psów"
}
```

**Response:** MP3 audio file

### [Watch the DEMO](https://youtu.be/CezrZJe6cQU)
