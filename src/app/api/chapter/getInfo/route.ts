// /api/chapter/getInfo

import { prisma } from "@/lib/db"
import { strict_output } from "@/lib/gpt"
import { getQuestionFromTranscript, getTranscript, searchYoutube } from "@/lib/youtube"
import { NextResponse } from "next/server"
import { z } from "zod"

const bodyParser = z.object({
    chapterId : z.string()
})

export async function POST(req:Request){
    try {

const body = await req.json()

const {chapterId} = bodyParser.parse(body)

const chapter = await prisma.chapter.findUnique({
    where:{
        id : chapterId
    }
})

if(!chapter){
    return NextResponse.json({
        success:false , error:"chapter not found"
    },{
        status: 404
    })
}

const videoId  = await searchYoutube(chapter.youtubeSearchQuery)

let transcript = await getTranscript(videoId)
let maxLength = 500;
transcript = transcript.split(' ').slice(0, maxLength).join(' ')


const {summary}: {summary : string} = await strict_output(
    'you are an AI capable of summarising a youtube transcript',
    'summarize in 250 words or less and do not talk of sponsor or anything unrealted to main topic , also do not introduce what the summary is about.\n'+transcript,
    {
        summary : "Summary of the transcript"
    }
)

console.log(summary , 'summary')

const questions = await getQuestionFromTranscript(
    transcript,
    chapter.name
)

console.log(questions , 'question')

await prisma.question.createMany({
    data : questions.map(question => {
        let options = [question.answer,question.option1,question.option2,question.option3]
        options.sort(()=> Math.random() - 0.5)
        return {
            question : question.question,
            answer : question.answer,
            options : JSON.stringify(options),
            chapterId:chapterId
        }
    })
})

await prisma.chapter.update({
    where : {
        id : chapterId
    },
    data:{
        videoId : videoId,
        summary : summary
    }
})

        return NextResponse.json({success : true})
        
    } catch (error) {
         if(error instanceof z.ZodError){
            return NextResponse.json({
                success: false , error : "Invalid Body" 
            },{
                status : 400
            })
         }
         else{
            // console.log(error)
           return NextResponse.json({
            success : false ,
            error : "unknown"
           },{
            status:500
           })
         }
    }
}
