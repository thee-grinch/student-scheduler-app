import axios from 'axios';
import pkg from '@google-cloud/aiplatform'; // Import the CommonJS module as a default export

// Destructure the required class from the imported package
const { TextServiceClient } = pkg.v1;

// Initialize the TextServiceClient
const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com', // Or your preferred region
};
const textClient = new TextServiceClient(clientOptions);

const chatWithAI = async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    return res.status(400).json({ message: 'Message cannot be empty.' });
  }

  const model = 'gemini-pro';
  const publisher = 'google';

  const request = {
    model: `projects/${process.env.GCLOUD_PROJECT}/locations/${clientOptions.apiEndpoint.split('-')[0]}/publishers/${publisher}/models/${model}`,
    prompt: {
      text: message,
    },
  };

  try {
    const [response] = await textClient.generateText(request);

    if (response.candidates && response.candidates.length > 0) {
      res.json({ reply: response.candidates[0].output });
    } else {
      res.status(200).json({ reply: 'No response generated.' });
    }
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ message: 'Failed to generate response from AI.' });
  }
};

export default chatWithAI;