import OpenAI from "openai";
const openai = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});

async function diet_decide(name, animal, breed, text) {

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "You are a dietician for pets, recommend a personalised diet chart providing all morning, evening, night and prohbited meals, the animal is " + animal + " and the breed is " + breed + ". My pet's name is " + name + "." +  text + "Reply in a nice tone, and start each point in a new line. Dont use any bold or italic texts.",
            },
        ],
        store: true,
    }); 
    
    return completion.choices[0].message.content;
}

export default diet_decide;
