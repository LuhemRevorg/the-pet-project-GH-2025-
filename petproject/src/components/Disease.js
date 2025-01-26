import OpenAI from "openai";
const openai = new OpenAI({apiKey: "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"});

const symptoms = "runny eyes, fever, snotty nose, coughing, vomiting, diarrhea, seizures, and paralysis";

async function disease_find(name, symptoms) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Consider you are the best veterinary doctor, I will provide you with the type of animal and a list of symptoms, you are supposed to tell me which disease the animal has, give me one disease which you think is most likely and also provide me with treatment. Following are the symptoms: " + symptoms + ". My pet's name is " + name,
            },
        ],
        store: true,
    });

    return completion.choices[0].message;
}



export default disease_find;