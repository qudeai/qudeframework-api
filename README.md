![Logo](https://res.cloudinary.com/docg651du/image/upload/v1736280044/framework_api_tqsocz.png)
# Qude Framework API for Interacting with AI Agents on local machine and api.qude.ai

Welcome to the **Qude Framework API**, a backend service enabling seamless interaction with AI agents created using the **Qude Framework**. This API provides an interface to fetch agent metadata and interact with their AI capabilities, leveraging OpenAI's GPT models.

---

## Features

- **Agent Metadata Retrieval**: Access detailed information about AI agents created using the Qude Framework.
- **Dynamic AI Interactions**: Communicate with agents powered by the Qude Framework and receive real-time, intelligent responses.
- **Local Deployment**: Run the API on your local machine for development and testing.
- **Customizable Backend**: Use Firebase locally for a fully customizable backend experience.
- **RESTful Endpoints**: Developer-friendly API design for easy integration.

---
# For Local Machine

## Prerequisites

Ensure the following are installed and configured on your system:

1. **Node.js** (v16 or higher)  
   [Download Node.js](https://nodejs.org/)

2. **npm** (Node Package Manager)  
   Comes bundled with Node.js.

3. **Firebase Service Account Key**  
   Required for local Firestore authentication.

4. **OpenAI API Key**  
   Obtain an API key from [OpenAI](https://platform.openai.com/).

---

## Dependencies

The project utilizes the following dependencies:

| Dependency         | Version  | Purpose                                                                 |
|--------------------|----------|-------------------------------------------------------------------------|
| `express`          | ^4.21.2  | Web framework for building API endpoints.                              |
| `cors`             | ^2.8.5   | Middleware to handle Cross-Origin Resource Sharing (CORS).             |
| `firebase-admin`   | ^13.0.2  | Firebase Admin SDK for Firestore integration.                          |
| `dotenv`           | ^16.4.7  | Secure management of environment variables.                            |
| `openai`           | ^4.77.3  | Integration with OpenAI’s GPT models for AI interactions.              |

Install all dependencies:
```bash
npm install
```
## Setup
#### 1. Clone the Repository
```bash
git clone https://github.com/qudeai/qudeframework-api.git
cd qudeframework-api
```
#### 2. Install Dependencies
```bash
npm install
```
#### 3. Configure Environment Variables
- Create a .env file in the root directory:
```bash
touch .env
```
- Add the following variables to your .env file:
```bash
OPENAI_API_KEY=your-openai-api-key
PORT=3000
```
#### 4. Add Firebase Credentials
- Copy the sample file and replace placeholders with your Firebase credentials:
```bash
cp serviceAccountKey.example.json serviceAccountKey.json
```

- Edit: serviceAccountKey.json
```bash
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY\\n-----END PRIVATE KEY-----\\n",
  "client_email": "your-client-email@your-project-id.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-client-email@your-project-id.iam.gserviceaccount.com"
}
```

### Running the API Locally
#### Start the server:
```bash
node index.js
```
#### Access the API locally:
```bash
http://localhost:3000
```

## API Endpoints
#### 1. Fetch Agent Details
- Retrieve metadata for an AI agent.

**GET** `/api/agent/:name`

- Request Example:
```bash
curl http://localhost:3000/api/agent/Aura
```
- Response Example:
```bash
{
  "name": "Aura",
  "description": "An intelligent agent designed to assist with tasks.",
  "createdAt": "2025-01-01T12:00:00Z"
}
```
#### 2. Interact with an Agent (GET Method)
- Interact with an AI agent using a query parameter.

**GET** `/api/agent/:name/interact?message=YourMessage`

- Request Example:
```bash 
curl "http://localhost:3000/api/agent/Aura/interact?message=Hello!"
```
- Response Example:
```bash
{
  "agent": "Aura",
  "reply": "Hello! How can I assist you today?"
}
```
#### 3. Interact with an Agent (POST Method)
- Interact with an AI agent using a JSON payload.

**POST** `/api/agent/:name/interact`

- Request Example:
```bash
curl -X POST "http://localhost:3000/api/agent/Aura/interact" \
-H "Content-Type: application/json" \
-d '{"message": "What is the weather today?"}'
```
- Response Example:
```bash
{
  "agent": "Aura",
  "reply": "I'm sorry, I cannot provide real-time weather updates."
}
```
## Example Usage in Node.js
- Here’s how you can interact with the API programmatically:
```bash
const fetch = require("node-fetch");

async function interactWithAgent(agentName, message) {
  const response = await fetch(`http://localhost:3000/api/agent/${agentName}/interact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    console.error("Failed to interact with the agent:", response.statusText);
    return;
  }

  const data = await response.json();
  console.log("Agent Reply:", data.reply);
}

interactWithAgent("Aura", "Hello there!");
```

# Using api.qude.ai
## Prerequisites

To use the API, ensure you have the following:

1. **API Access**: The API is publicly available at [api.qude.ai](https://api.qude.ai).
2. **API Client**: Use a tool like `curl`, Postman, or any HTTP client library in your preferred programming language.

---

## API Endpoints

### 1. Fetch Agent Details
Retrieve metadata about an agent from the official Qude Framework database.

**GET** `/api/agent/:name`

**Request Example**
```bash
curl https://api.qude.ai/api/agent/Aura
```
**Response Example:**
```bash
{
  "name": "Aura",
  "description": "An intelligent agent designed to assist with tasks.",
  "createdAt": "2025-01-01T12:00:00Z"
}
```
### 2. Interact with an Agent (GET Method)
Send a message to an agent and receive an AI-generated response using query parameters.

**GET** `/api/agent/:name/interact?message=YourMessage`

**Request Example:**
```bash
curl "https://api.qude.ai/api/agent/Aura/interact?message=Hello!"
```
**Response Example:**
```bash
{
  "agent": "Aura",
  "reply": "Hello! How can I assist you today?"
}
```
### 3. Interact with an Agent (POST Method)
Send a message to an agent and receive an AI-generated response using a JSON payload.

**POST** `/api/agent/:name/interact`

**Request Example:**
```bash
curl -X POST "https://api.qude.ai/api/agent/Aura/interact" \
-H "Content-Type: application/json" \
-d '{"message": "Hello, Aura?"}'
```
**Response Example:**
```bash
{
  "agent": "Aura",
  "reply": "Hello, how can i help you?"
}
```

## Example Usage in Node.js
Here’s how you can interact with the API programmatically:

```bash
const fetch = require("node-fetch");

async function interactWithAgent(agentName, message) {
  const response = await fetch(`https://api.qude.ai/api/agent/${agentName}/interact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    console.error("Failed to interact with the agent:", response.statusText);
    return;
  }

  const data = await response.json();
  console.log("Agent Reply:", data.reply);
}

interactWithAgent("Aura", "Hello there!");
```
---
# USING api.qude.ai

## Prerequisites

To use the API, ensure you have the following:

1. **API Access**: The API is publicly available at [api.qude.ai](https://api.qude.ai).
2. **API Client**: Use a tool like `curl`, Postman, or any HTTP client library in your preferred programming language.

---

## API Endpoints

### 1. Fetch Agent Details
Retrieve metadata about an agent from the official Qude Framework database.

**GET** `/api/agent/:name`

#### Request Example:
```bash
curl https://api.qude.ai/api/agent/Aura
```
**Response Example:**
```bash
{
  "name": "Aura",
  "description": "An intelligent agent designed to assist with tasks.",
  "createdAt": "2025-01-01T12:00:00Z"
}
```
#### 2. Interact with an Agent (GET Method)
Send a message to an agent and receive an AI-generated response using query parameters.

**GET** `/api/agent/:name/interact?message=YourMessage`

**Request Example:**
```bash
curl "https://api.qude.ai/api/agent/Aura/interact?message=Hello!"
```
**Response Example:**
```bash
{
  "agent": "Aura",
  "reply": "Hello! How can I assist you today?"
}
```
#### 3. Interact with an Agent (POST Method)
Send a message to an agent and receive an AI-generated response using a JSON payload.

**POST** `/api/agent/:name/interact`

**Request Example:**
```bash
curl -X POST "https://api.qude.ai/api/agent/Aura/interact" \
-H "Content-Type: application/json" \
-d '{"message": "Hello, Aura"}'
```
**Response Example:**
```bash
{
  "agent": "Aura",
  "reply": "Hey, how can i help you?"
}
```
## Example Usage in Node.js
Here’s how you can interact with the API programmatically:
```bash
const fetch = require("node-fetch");

async function interactWithAgent(agentName, message) {
  const response = await fetch(`https://api.qude.ai/api/agent/${agentName}/interact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    console.error("Failed to interact with the agent:", response.statusText);
    return;
  }

  const data = await response.json();
  console.log("Agent Reply:", data.reply);
}

interactWithAgent("Aura", "Hello there!");
```

## Notes for api.qude.ai
- No Local Setup Required: This API is fully hosted and ready to use—no Firebase setup or service account keys needed.
- Agent Metadata: All agent information is sourced directly from the official Qude Framework database.

## Contributing
- We welcome contributions to enhance this API! If you encounter issues or have suggestions, feel free to open an issue or submit a pull request on our GitHub repository.

