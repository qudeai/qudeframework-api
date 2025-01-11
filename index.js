const express = require("express");
const cors = require("cors");
const db = require("./firebase"); 
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Query:", req.query);
  next();
});
app.get("/api/agent/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const docRef = db.collection("agents").doc(name);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Agent not found in the database" });
    }

    const agentDetails = docSnap.data();
    return res.json(agentDetails);
  } catch (error) {
    console.error("Error fetching agent details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/agent/:name/interact", async (req, res) => {
  const { name } = req.params;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const docRef = db.collection("agents").doc(name);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({ error: "Agent not found in the database" });
    }

    const agentDetails = docSnap.data();

    const openAIResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are ${name}, a helpful AI agent. ${agentDetails.description || ""}`,
        },
        { role: "user", content: message },
      ],
    });

    const agentReply =
      openAIResponse.choices[0]?.message?.content ||
      "I'm sorry, I couldn't process your request.";

    return res.json({ agent: name, reply: agentReply });
  } catch (error) {
    console.error("Error interacting with agent:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
