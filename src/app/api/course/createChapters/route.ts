// /api/couse/createChapters 

import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req:Request){
  try {
    const session = await getAuthSession() 
    if(!session?.user){
       return new NextResponse('unauthorized',{status:401})
    }
    const isPro  = await checkSubscription()
    if(session.user.credits <= 0 && !isPro){
        return new NextResponse('no credits',{status:402})
    }

     const body = await req.json()
     const {title , units} = createChaptersSchema.parse(body)
     
    //  we use title and units in openAI api to get below outputUnits
    // sometime gpt gives invalid json , so it can break our code , so we hace strictJSON library , which can help us i checkingin json and when gpt send us wrong json , we send request again until we get the right json 
    //https://github.com/tanchongmin/strictjson/tree/main
    type outputUnits = {
        title:string;
        chapters : {
            youtube_search_query : string;
            chapter_title : string
        }[]
    }[]

    //we are using strict json gpt framework , we need give its input and it will generate my expected json for me
    //go to gpt.ts to check all input functionality 
    let output_units : outputUnits = await strict_output(
        'you are an ai capable of curating course content , coming up with relevant chapter titles, and finding relevant youtube videos for each chapter',

        // chat gpt will create 3 json for this 
        new Array(units.length).fill(
            `its your job to create a course about ${title}. The user has requested to create chapters for each of the units. Then for each chapter, provide a detailed youtube search query that can be used to find informative educational video for each chapter. Each query should give a educational informative course in youtube`
        ),

        // each json have this type of thing
        {
            // it means output object must have title with description
            title:'title of the unit',
            chapters:'an array of chapters, each chapters should have a youtube search query and a chapter_title key in the json object'
        }
    )

    // searching for photos of title of course 
    const imageSearchTerm = await strict_output(
        'you are an ai capable of finding the most relevant image for a course',
        `please provide a good image search term for the title of a course about ${title}.this search term will be fed into the unsplash api so make sure that this is a good search term that will return good results`,
        {
              image_search_term : 'a good search term for the title of the course'
        }
    )

    //getting image from unspash using above search term 
    const course_image = await getUnsplashImage(imageSearchTerm.image_search_term)

    const course = await prisma.course.create({
        data:{
            name : title,
            image:course_image
        },
    })

    for (const unit of output_units) {
        const title = unit.title;

        const prismaUnit = await prisma.unit.create({
            data:{
                name:title,
                courseId:course.id
            },
        })

        await prisma.chapter.createMany({
            data : unit.chapters.map((chapter)=>{
                return { 
                   name : chapter.chapter_title,
                   youtubeSearchQuery:chapter.youtube_search_query,
                   unitId:prismaUnit.id
                } 
            })
        })
    }

    await prisma.user.update({
        where:{
            id : session.user.id
        },
        data :{
            credits : {
                decrement : 1
            }
        }
    })

    return NextResponse.json({course_id:course.id})
31
  } catch (error) {
     if(error instanceof ZodError){
        return new NextResponse("invalid body",{status:400})
     }
     return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(req:Request){

}