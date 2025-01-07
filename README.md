![Logo](https://res.cloudinary.com/docg651du/image/upload/v1736257764/framework_b9spu5.png)

# Backend API for Interactions with Qude AI Agents

This is an open-source backend API designed to manage and interact with Qude AI agents. The API facilitates retrieving agent details and interacting with agents via Qude-Framework model. This guide provides instructions for setting up the API locally, along with examples and usage instructions.

---

## Features

- **Fetch Agent Details**: Retrieve metadata for AI agents which are created with Qude Framework.
- **Interact with Agents**: Send messages to agents and receive responses.
- **Local Deployment**: Easily run the API on a local server/machine.
- **RESTful Endpoints**: Simple and intuitive API endpoints.

---

## Dependencies
The project uses the following dependencies:

- Express: Web server framework to handle API routes.
- Firebase-admin: Firebase Admin SDK for accessing Firestore and authentication services.
- Dotenv: Manages environment variables securely.
- node-fetch: Allows fetching data from APIs in Node.js.

To install these dependencies, run:
```bash
npm install express firebase-admin dotenv node-fetch
```
---

## Prerequisites

Ensure the following are installed on your system:

1. **Node.js** (v16 or higher)  
   [Download Node.js](https://nodejs.org/)

2. **npm** (Node Package Manager)  
   Comes bundled with Node.js.

3. **Firebase Service Account Key**  
   Required to connect to your Firebase database.

4. **OpenAI API Key**  
   Obtain an API key from [OpenAI](https://platform.openai.com/).

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/qudeai/qudeframework-api.git
cd qudeframework-api 
```

### 2. Install Dependencies
```bash 
npm install 
```
### 3. Create a .env File
```bash 
touch .env
```
### Add the following environment variables:
```bash 
OPENAI_API_KEY=your-openai-api-key
PORT=3000
```
Place your Firebase service account key file in the root directory as serviceAccountKey.json.

## Running the Server Locally

### 1. Start the server
``` bash
node index.js
```
### 2. Access the API locally
Open your browser or use a tool like curl to interact with the API at:
http://localhost:3000.

## API Endpoints Locally
#### 1. Fetch Agent Details
``` bash 
GET /api/agent/:name
```
Request 
```bash 
curl http://localhost:3000/api/agent/Aura
```
Response 
```bash 
{
  "name": "Aura",
  "description": "An intelligent agent designed to assist with tasks.",
  "createdAt": "2025-01-01T12:00:00Z"
}
```
#### 2. Interact with an Agent (GET Method)
```bash 
GET /api/agent/:name/interact?message=YourMessage
```

Request
```bash
curl "http://localhost:3000/api/agent/Aura/interact?message=Hello!"
```
Response 
```bash
{
  "agent": "Aura",
  "reply": "Hello! How can I assist you today?"
}
```
#### 3. Interact with an Agent (POST Method)
```bash 
POST /api/agent/:name/interact
```
Request
```bash
curl -X POST "http://localhost:3000/api/agent/Aura/interact" \
-H "Content-Type: application/json" \
-d '{"message": "Hello, Aura"}'

```
Response 
```bash 
{
  "agent": "Aura",
  "reply": "Hey, how can i help you?"
}
```

## Example Usage in Node.js
You can interact with the API programmatically using Node.js:
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

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

