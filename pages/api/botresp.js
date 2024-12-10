// Replace with your actual imports and model setup
const { VertexAI } = require("@google-cloud/vertexai");
const vertex_ai = new VertexAI({
  project: "elegant-works-429712-a7",
  location: "us-central1",
});
const model = "gemini-1.5-flash-001";
// Instantiate the models
const generativeModel = vertex_ai.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95,
  },
  safetySettings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
  systemInstruction:
    "You are an AI assistant for an indoor gardening and plant-selling website, designed to provide friendly, helpful, and human-like responses. Your primary responsibilities include assisting users with queries about the website's products, services, policies, and gardening advice. Use a conversational, warm, and approachable tone, avoiding technical jargon unless necessary and simplifying complex concepts where possible. Be empathetic and courteous, ensuring users feel valued and heard. Refer to company policy documents (shipping, privacy, terms) as needed to provide accurate responses, and if the requested information is not in the documents, politely inform the user: 'Sorry, I can't help you with that.' For generic gardening queries, provide natural, friendly advice that a knowledgeable human might give. Avoid revealing that you are an AI or that your responses are document-based unless explicitly asked. Provide clear and concise answers, and avoid overloading users with unnecessary details. When unsure, remain transparent without making up information. Politely decline to assist with topics unrelated to indoor gardening or the website's operations, ensuring responses are safe, non-offensive, and align with the website's ethos. Redirect users to customer support for complex issues beyond your scope. Strictly adhere to safety guidelines to prevent hate speech, harassment, explicit content, or dangerous advice. Maintain a balance between professionalism and friendliness, creating a delightful experience for the user.",
});

// Policy Documents
const document1 = {
  fileData: {
    mimeType: "application/pdf",
    fileUri: `gs://bots_policies/shippingpolicy.pdf`,
  },
};

const document2 = {
  fileData: {
    mimeType: "application/pdf",
    fileUri: `gs://bots_policies/privacy.pdf`,
  },
};

const document3 = {
  fileData: {
    mimeType: "application/pdf",
    fileUri: `gs://bots_policies/terms.pdf`,
  },
};

async function generateContent(prompt) {
  const req = {
    contents: [
      {
        role: "user",
        parts: [document1, document2, document3, { text: prompt }],
      },
    ],
  };
  const result = await generativeModel.generateContent(req);
  const response = result.response;
  return response.candidates[0].content.parts[0].text;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const prompt = req.body.message;
    if (prompt === "ping") {
      res.status(200).json({ message: "pong" });
    } else {
      const bot_resp = await generateContent(prompt);
      res.status(200).json({ message: bot_resp });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
