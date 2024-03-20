
# API documentation

This API accepts HTTP POST requests to the URL `https://fermium.vercel.app/api/request`. Requests must include a JSON body with the following fields: `classe` (`class`), `sezione` (`section`), `ora` (`hour`), `giorno` (`day`).

Here is how to make a request to this API in different programming languages:

## C

```c
#include <stdio.h>
#include <curl/curl.h>

int main(void) {
    CURL *hnd = curl_easy_init();
    if(hnd) {
        curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");
        curl_easy_setopt(hnd, CURLOPT_URL, "https://fermium.vercel.app/api/request");

        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Accept: */*");
        headers = curl_slist_append(headers, "Content-Type: application/json");
        curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

        curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, "{\n        \"classe\": 4,\n\t\t\t\t\"sezione\": \"E\",\n\t\t\t\t\"ora\": 2,\n\t\t\t\t\"giorno\": 1\n}");

        CURLcode ret = curl_easy_perform(hnd);
        if(ret != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(ret));
        }

        /* always cleanup */
        curl_easy_cleanup(hnd);
    }
    return 0;
}
```

## Java

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Request {
    public static void main(String[] args) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://fermium.vercel.app/api/request"))
                .header("Accept", "*/*")
                .header("Content-Type", "application/json")
                .method("POST", HttpRequest.BodyPublishers.ofString("{\n        \"classe\": 4,\n\t\t\t\t\"sezione\": \"E\",\n\t\t\t\t\"ora\": 2,\n\t\t\t\t\"giorno\": 1\n}"))
                .build();

            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println(response.body());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## PowerShell

```powershell
$body = @{
    classe = 4
    sezione = "E"
    ora = 2
    giorno = 1
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri 'https://fermium.vercel.app/api/request' -Method Post -Body $body -ContentType 'application/json'

$response
```

## Python

```python
import requests

url = "https://fermium.vercel.app/api/request"
headers = {"Accept": "*/*", "Content-Type": "application/json"}
data = {"classe": 4, "sezione": "E", "ora": 2, "giorno": 1}

response = requests.post(url, headers=headers, json=data)

print(response.text)
```

## Rust

```rust
use reqwest::Error;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let client = reqwest::Client::new();
    let res = client.post("https://fermium.vercel.app/api/request")
        .json(&serde_json::json!({
            "classe": 4,
            "sezione": "E",
            "ora": 2,
            "giorno": 1
        }))
        .send()
        .await?;

    println!("{}", res.text().await?);

    Ok(())
}
```

```toml
[dependencies]
reqwest = "0.11"
tokio = { version = "1", features = ["full"] }
```

## Shell

```bash
curl -X POST -H "Accept: */*" -H "Content-Type: application/json" -d '{
    "classe": 4,
    "sezione": "E",
    "ora": 2,
    "giorno": 1
}' 'https://fermium.vercel.app/api/request'
```


## JavaScript (frontend)

```javascript
let headersList = {
 "Accept": "*/*",
 "Content-Type": "application/json"
}

let bodyContent = JSON.stringify({
        "classe": 4,
        "sezione": "E",
        "ora": 2,
        "giorno": 1
});

let response = await fetch("https://fermium.vercel.app/api/request", { 
  method: "POST",
  body: bodyContent,
  headers: headersList
});

let data = await response.text();
console.log(data);
```

! ! ! replace the values of `classe`, `sezione`, `ora` and `giorno` with the desired values.

&nbsp;

# TODO:
- [x] 0. fix the default usestate value for the input field
- [x] 1. render the results of the api call in a nice way 
- [x] 2. implement day and hour detection and conversion in apiable formats, and pass them to the api call
- [x] 3. for gods sake, fix tailwindcss
- [x] 4. fix the frontend javascript code
- [x] 5. ? general code cleanup ?
- [ ] 6. add loading component while waiting for the api response
- [ ] 7. add error handling for the api call with error component




