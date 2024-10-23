const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'auto-verdue-test', location: 'us-central1' });
const model = 'gemini-1.5-flash-001';

// Instantiate the models
const generativeModel = vertex_ai.getGenerativeModel({
    model: model,
    generationConfig: {
        'maxOutputTokens': 8192,
        'temperature': 1,
        'topP': 0.95,
    },
    safetySettings: [
        {
            'category': 'HARM_CATEGORY_HATE_SPEECH',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
            'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
            'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
            'category': 'HARM_CATEGORY_HARASSMENT',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
        }
    ],
    systemInstruction: "You are a bot for Auto verdure, answer strictly from the document, if anything is not mentioned in the document, answer in a way that implies that the information is not there in the document. Example: user: 'what is company's policy on wearing analog watches on saturday?' response: 'no such company policy is there'",
});

const document1 = {
    fileData: {
        mimeType: 'application/pdf',
        fileUri: `gs://auto-verdure-dataset/auto-verdure-general-policies-pdf.pdf`
    }
};

async function generateContent(prompt) {
    const req = {
        contents: [
            { role: 'user', parts: [document1, { text: prompt }] }
        ],
    };

    const result = await generativeModel.generateContent(req);
    const response =  result.response;

    return response.candidates[0].content.parts[0].text;
}



export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Parse the request body
        const prompt = req.body.message;
        if (prompt === 'ping') {
            res.status(200).json({ message: 'pong'});
        } else {
            const bot_resp = await generateContent(prompt);
            res.status(200).json({ message: bot_resp});
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}