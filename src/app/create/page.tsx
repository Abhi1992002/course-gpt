import { CreateCourseForm } from '@/components/CreateCourseForm';
import { getAuthSession } from '@/lib/auth';
import { checkSubscription } from '@/lib/subscription';
import { InfoIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type CreatePageProps = {}

 const CreatePage = async({}: CreatePageProps) => {

    const session = await getAuthSession()

    if(!session?.user){
        redirect('/gallery')
    }

    const isPro = await checkSubscription()

  return (
    <div className='flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0'>
      <h1 className='self-center text-3xl text-center font-bold sm:text-6xl'>
        Create Course Using AI
      </h1>

      <div className='mt-5 p-[1px] border-none animate-gradient bg-gradient-to-r from-pink-500 rounded-lg via-red-500 to-yellow-500 flex items-center justify-center'>
        <div className='bg-secondary rounded-lg flex p-4'>
        <InfoIcon className='w-12 h-12 mr-3 text-blue-400 ' />
         <div>
            Enter in a course title , or what you want to larn about . Then enter a list of units, which are the specifics you want to learn. And our AI will generate a course for you
         </div>
        </div>
        
      </div>

      <CreateCourseForm isPro={isPro}/>
    </div>
  );
};

export default CreatePage;