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
functions-framework --target=hello_world
```

bash
```
curl -X POST http://localhost:8080 -H "Content-Type: application/json" -d '{"message": "Hello from the client!"}'
```

### API Docs

http://127.0.0.1:8085?level=[A1|A2|B1|B2]&from=[pl|en|us]&to=[pl|en|us]
