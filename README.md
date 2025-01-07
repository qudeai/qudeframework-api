# Backend API for Interactions with Qude AI Agents

This is an open-source backend API designed to manage and interact with Qude AI agents. The API facilitates retrieving agent details and interacting with agents via Qude-Framework model. This guide provides instructions for setting up the API locally, along with examples and usage instructions.

---

## Features

- **Fetch Agent Details**: Retrieve metadata for AI agents which are created with Qude Framework.
- **Interact with Agents**: Send messages to agents and receive responses.
- **Local Deployment**: Easily run the API on a local server/machine.
- **RESTful Endpoints**: Simple and intuitive API endpoints.

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

2. Install Dependencies
bash
Copy code
npm install
3. Set Up Environment Variables
Create a .env file in the root directory

bash
Copy code
touch .env
Add the following variables to your .env file

makefile
Copy code
OPENAI_API_KEY=your-openai-api-key
PORT=3000
Place your Firebase service account key file in the root directory as serviceAccountKey.json.

Running the Server Locally
Start the server

bash
Copy code
node index.js
Access the server
By default, the server runs on http://localhost:3000.

API Endpoints
1. Fetch Agent Details
GET /api/agent/:name
Request Example:

bash
Copy code
curl http://localhost:3000/api/agent/Aura
Response Example:

json
Copy code
{
  "name": "Aura",
  "description": "An intelligent agent created with Qude Framework.",
  "createdAt": "2025-01-01T12:00:00Z"
}
2. Interact with an Agent (GET Method)
GET /api/agent/:name/interact?message=YourMessage
Request Example:

bash
Copy code
curl "http://localhost:3000/api/agent/Aura/interact?message=Hello!"
Response Example:

json
Copy code
{
  "agent": "Aura",
  "reply": "Hello! How can I assist you today?"
}
3. Interact with an Agent (POST Method)
POST /api/agent/:name/interact
Request Example:

bash
Copy code
curl -X POST "http://localhost:3000/api/agent/Aura/interact" \
-H "Content-Type: application/json" \
-d '{"message": "What is the weather today?"}'
Response Example:

json
Copy code
{
  "agent": "Aura",
  "reply": "I'm sorry, I cannot provide real-time weather updates."
}
Example Usage in Node.js
javascript
Copy code
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
Notes
This project uses Firebase Firestore to store agent metadata.
Sensitive keys, such as OpenAI and Firebase credentials, are required to run the project locally but should never be exposed in public repositories.
If running this project locally, make sure to set up your Firebase project and service account.
Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.
