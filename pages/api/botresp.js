import { Mistral } from "@mistralai/mistralai";

// Initialize Mistral client
const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

// Store your agent ID
const AGENT_ID = "ag:27cd8793:20241220:untitled-agent:728ec85b"; // Your agent ID

async function generateContent(prompt) {
  try {
    const chatResponse = await client.agents.complete({
      agentId: AGENT_ID, // Changed from agent_id to agentId
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return chatResponse.choices[0].message.content;
  } catch (error) {
    console.error("Mistral Agent API Error:", error);
    throw new Error("Failed to generate response from Mistral AI Agent");
  }
}

export default async function handler(req, res) {
  try {
    // Add CORS headers
    res.setHeader("Access-Control-Allow-Origin", "https://autoverdure.com");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (req.method === "POST") {
      const prompt = req.body.message;

      if (prompt === "ping") {
        res.status(200).json({ message: "pong" });
      } else {
        try {
          const bot_resp = await generateContent(prompt);
          res.status(200).json({ message: bot_resp });
        } catch (generateError) {
          console.error("Generation Error:", generateError);
          res.status(500).json({
            message: "Error generating response",
            error: generateError.toString(),
          });
        }
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Unhandled Error:", error);
    res.status(500).json({
      message: "Unexpected server error",
      error: error.toString(),
    });
  }
}
