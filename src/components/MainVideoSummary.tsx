import { Chapter, Unit } from '@prisma/client';
import React from 'react';

type MainVideoSummaryProps = {
    chapter : Chapter
    unit : Unit
    unitIndex : number 
    chapterIndex : number   

}

export const MainVideoSummary = ({unit,unitIndex,chapter,chapterIndex}: MainVideoSummaryProps) => {


  return (
    <div className='flex-[2] mt-16'>
        <h4 className='text-sm uppercase text-secondary-foreground/60'> 
             UNit {unitIndex+1} &bull;  Chapter {chapterIndex+1}
        </h4>
        <h1 className='text-4xl font-bold'>
            {chapter.name}
        </h1>
        <iframe title='chapter-video' className='w-full mt-4 aspect-video max-h-[24rem]' src={`https://www.youtube.com/embed/${chapter.videoId}`} allowFullScreen></iframe>
        <div className='mt-4'>
           <h3 className='text-3xl font-semibold'>
             Summary
           </h3>
           <p className='mt-2 text-secondary-foreground/80'>
              {chapter.summary} 
           </p>
        </div>
    </div>
  );
};