import OpenAI from "openai";
const openai = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});

async function disease_find(name, symptoms, animal) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: `Consider you are the best veterinary doctor. I will provide the symptoms of my pet, and you need to identify the disease and treatment. My pet's name is ${name}.The animal is ${animal}. Reply in a nice tone, and start each point in a new line. Dont use any bold or italic texts.${symptoms}`,
            },
        ],
        store: true,
    });

    return completion.choices[0].message.content;
}

export default disease_find;