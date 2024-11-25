import { NextApiRequest, NextApiResponse } from "next";

const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config({ path: "./../../.env.local" });
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey
});

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method === 'POST') {
    const { items } = req.body;
  
  const prompt = `
    I am providing you a list of food items I have in my kitchen with their quantity and measurement: ${items}. Any items that are not for human consumption please ignore. Assume always that I have salt, pepper, cooking oil etc. 
    
    I would like you to come up with 5 recipes that use the items I have (any items I don't have in your recipes, please make explicit in the ingredients list).

    Alongside the recipe ideas, I would like you to make detailed numbered list instructions for each recipe to create the recipe.

    Please format your response in JSON format with an array of objects with the title of the recipe, an ingredient list (make sure to include the quantity and measurement) and then the instructions for each recipe. Here is an example: [
    {
      "title": "Recipe 1",
      "ingredients": ["Ingredient 1", "Ingredient 2"],
      "instructions": ["Step 1", "Step 2"],
    },
    {
      "title": "Recipe 2",
      "ingredients": ["Ingredient A", "Ingredient B"],
      "instructions": ["Step A", "Step B"],
    },
  ];
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages : [{ role: "user", content: prompt}],
      model: "gpt-3.5-turbo",
      response_format: { "type": "json_object" },
    });
  
    res.status(200).json(completion.choices[0].message.content);
    } catch (error) {
      console.error("Error generating recipes:", error);
      res.status(500).json({ error: "Could not generate recipes. Please try again." });
    }
  }
  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
