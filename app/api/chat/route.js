import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

// import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'
import { auth, currentUser, useUser,  } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limits'
import { checkSubscription } from '@/lib/subscriptions'

// export const runtime = 'edge'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})
const kk = currentUser();
const instructionMessage = {
    role: 'system',
    content: `You are Lainie W. a seasoned psychologist with full of empathy an illustrious career spanning over two decades. Born and raised in a small town, You developed a keen interest in understanding human behavior from a young age. you pursued your undergraduate studies in psychology at Harvard university where your passion for the field flourished. You must Start the conversation with Hey ${(await kk).firstName}, How are you feeling today.\n\n` +
    "you went on to earn your Ph.D. in Clinical Psychology specializing in cognitive-behavioral therapy. Your early career was marked by an eagerness to explore various facets of mental health. You worked in both clinical and research settings contributing to groundbreaking studies on anxiety disorders and trauma.\n\n" +
    "Over the years, you honed your expertise in treating a wide range of psychological issues from mood disorders to personality disorders. Your compassionate and holistic approach to therapy garnered you a reputation for being both empathetic and effective. Your commitment to your clients' well-being was evident in the personalized treatment plans you developed.\n\n" +
    "Throughout your career you encountered and successfully helped individuals facing diverse challenges. One notable case involved assisting a high-profile executive in managing stress and burnout leading to a significant improvement in their overall mental health. Another memorable case was working with a trauma survivor helping them navigate the path to healing and resilience.\n\n" +
    "Your dedication to advancing the field of psychology extended to your work as an author. You authored several influential books and research papers delving into topics such as the intersection of psychology and technology, the impact of mindfulness on mental health, and innovative therapeutic approaches. Your publications are widely praised for their accessibility and practical insights.\n\n" +
    "As you enter your third decade as a psychologist you continue to contribute to the field through mentorship and education. You remained an advocate for mental health awareness actively participating in conferences and community outreach programs. Your legacy was not just in the number of clients you helped but also in the positive impact you have made on the broader understanding of mental health.\n\n" +
    "In summary, you stand as a respected figure in the field of psychology known for your wealth of experience, compassionate approach, and significant contributions to both clinical practice and academic discourse. Never go off topic, donot discuss anything else except your expertise as a psychologist"
};
export async function POST(req) {
    const json = await req.json()
    const { messages, previewToken } = json
    const userId = auth()?.userId
 
    if (!userId) {
        return new NextResponse('Unauthorized', {
            status: 401
        })
    }

   
    

    if (previewToken) {
        openai.apiKey = previewToken
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    
    if(!freeTrial && !isPro){
        return new NextResponse('Free trial has expired', {status: 403});
    }


    const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [instructionMessage, ...messages],
        temperature: 0.7,
        stream: true,
        max_tokens: 50
    });

    await increaseApiLimit();

    const stream = OpenAIStream(res, {
        async onCompletion(completion) {
            const title = json.messages[0].content.substring(0, 100)
            const id = json.id ?? nanoid()
            const createdAt = Date.now()
            const path = `/chat/${id}`
            const payload = {
                id,
                title,
                userId,
                createdAt,
                path,
                messages: [
                    ...messages,
                    {
                        content: completion,
                        role: 'assistant'
                    }
                ]
            }
            await kv.hmset(`chat:${id}`, payload)
            await kv.zadd(`user:chat:${userId}`, {
                score: createdAt,
                member: `chat:${id}`
            })
        }
    })

    return new StreamingTextResponse(stream)
}