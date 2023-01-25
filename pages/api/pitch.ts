// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  if (prompt.length > 1000) {
    return res.status(400).json({ error: "Prompt Muito Longa" });
  }
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Create an personal pitch in brazilian portuguese based on the following data. \n Data: ${prompt}\n Perfect Pitch for you:`,
    max_tokens: 1000,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const pitch = completion.data.choices[0].text;

  res.status(200).json({ pitch });
}
