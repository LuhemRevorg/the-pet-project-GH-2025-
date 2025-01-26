import OpenAI from "openai";
const openai = new OpenAI({apiKey: "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"});

async function diet_decide(name, animal, breed) {

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "You are a dietician for pets, recommend a personalised diet chart, the animal is " + animal + " and the breed is " + breed + ". My pet's name is " + name,
            },
        ],
        store: true,
    });
    
    return completion.choices[0].message;
}

export default diet_decide;
