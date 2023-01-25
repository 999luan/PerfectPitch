import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.query.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt Invalida" });
  }
  if (prompt.length > 8000) {
    return res.status(400).json({ error: "Prompt Muito Longa" });
  }
  const promptString = `Create Documentation to this code \n Data: ${JSON.stringify(
    prompt
  )} \n your documentation:`;

  const completion = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: promptString,
    max_tokens: 8000,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const codeDoc = completion.data.choices[0].text;

  res.status(200).json({ codeDoc });
}
