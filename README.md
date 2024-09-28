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
functions-framework --target=hello_world
```

bash
```
curl -X POST http://localhost:8080 -H "Content-Type: application/json" -d '{"message": "Hello from the client!"}'
```

powershell
```
$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    "name" = "John"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://us-central1-hackyeah-2024.cloudfunctions.net/hello_world" -Method POST -Headers $headers -Body $body
```
