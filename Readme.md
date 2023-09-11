## Instalation
Clone repository (local branch):
```bash
git clone -b local https://github.com/ZakaryaMeddahi/URL-Shortener.git
```
Navigate to server folder:
```bash
cd server
```
Install node dependencies:
```bash
npm install
```
Create .env file and add your Atlas mongoDB URI in it, here is an example:
```bash
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.<EMAIL>.net/<dbname>?retryWrites=true&w=maj
```
Then add client side url in .env as well:
```bash
CLIENT_DOMAIN=http://localhost:5500/client/
```
Start the application with this command line:
```bash
npm run start
```
Now you can start the frontend live server on port 5500 then navigate to http://localhost:5500/client/login.html
Congratulation 🥳

# API Design
## Authentication
### Register
**Endpoint(URL):** `/api/v1/auth/register` \
**Request Method:** <span style="color:grey;">POST</span> \
<em>Request Body</em>
```json
  {
    "username": <USERNAME>,
    "email": <EMAIL>,
    "password": <PASSWORD>
  }
```
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "user": {
      "id": <ID>,
      "username": <USERNAME>
    }
  }
```
<em style="color:red">Failure Response Body (Bad Request)</em>
```json
  {
    "success": "false",
    "message": "Invalid username, email, password!"
  }
```

### Login
**Endpoint(URL):** `/api/v1/auth/login` \
**Request Method:** <span style="color:grey;">POST</span> \
<em>Request Body</em>
```json
  {
    "email": <EMAIL>,
    "password": <PASSWORD>
  }
```
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "user": {
      "id": <ID>,
      "username": <USERNAME>
    }
  }
```
<em style="color:red">Failure Response Body (Not Found)</em>
```json
  {
    "success": "false",
    "message": "Incorrect password!"
  }
```
<em style="color:red">Failure Response Body (Bad Request)</em>
```json
  {
    "success": "false",
    "message": "Invalid email, password!"
  }
```

## Shortcuts
### Get All Shortcuts
**Endpoint(URL):** `/api/v1/urls` \
**Request Method:** <span style="color:grey;">GET</span> \
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "shortcuts": [
      {
        "id": <ID1>,
        "pathname": <PATHNAME>,
        "url": <URL>
      },
      {
        "id": <ID2>,
        "pathname": <PATHNAME>,
        "url": <URL>
      }
    ]
  }
```

### Create Shortcut
**Endpoint(URL):** `/api/v1/urls` \
**Request Method:** <span style="color:grey;">POST</span> \
<em>Request Body</em>
```json
  {
    "url": <URL>,
    "pathname": <PATHNAME>
  }
```
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "shortcut": {
      "id": <ID>,
      "pathname": <PATHNAME>,
      "url": <URL>
    }
  }
```
<em style="color:red">Failure Response Body</em>
```json
  {
    "success": "false",
    "message": "Cannot create a shortcut, Provide a URL please!"
  }
```

### Get Shortcut
**Endpoint(URL):** `/api/v1/urls/:id` \
**Request Method:** <span style="color:grey;">GET</span> \
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "shortcut": {
      "id": <ID>,
      "pathname": <PATHNAME>,
      "url": <URL>
    }
  }
```
<em style="color:red">Failure Response Body (Not Found)</em>
```json
  {
    "success": "false",
    "message": "There is no shortcut with ID <ID>!"
  }
```
<em style="color:red">Failure Response Body (Bad Request)</em>
```json
  {
    "success": "false",
    "message": "<ID> is not ID, Provide a valid ID please!"
  }
```

### Update Shortcut
**Endpoint(URL):** `/api/v1/urls/:id` \
**Request Method:** <span style="color:grey;">PUT</span> \
<em>Request Body</em>
```json
  {
    "url": <URL>,
    "pathname": <PATHNAME>
  }
```
<em style="color:green">Success Response Body</em>
```json
  {
    "success": "true",
    "url": {
      "id": <ID>,
      "pathname": <PATHNAME>,
      "url": <URL>
    }
  }
```
<em style="color:red">Failure Response Body (Not Found)</em>
```json
  {
    "success": "false",
    "message": "There is no shortcut with ID <ID>!"
  }
```
<em style="color:red">Failure Response Body (Bad Request)</em>
```json
  {
    "success": "false",
    "message": "<ID> is not ID, Provide a valid ID please!"
  }
```

### Redirecting To URL
**Endpoint(URL):** `/:pathname` \
**Request Method:** <span style="color:grey;">GET</span> \
<em style="color:green">Success Response Body</em> \
`REDIRECT TO <URL>`
<em style="color:red">Failure Response Body (Not Found)</em> \
`REDIRECT TO not-found page`
