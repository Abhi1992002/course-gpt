import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InfoIcon, Plus, Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

type TestingProps = {}

export const Testing = ({}: TestingProps) => {

    const mainContainer = useRef(null);
    const units = [{
      title : "hoisting"
    },{
      title : "oops"
    }]
    const isInView = useInView(mainContainer,{
      margin:"-300px 0px -300px 0px"
    })

  return (
    <div ref={mainContainer} className='flex justify-center items-center h-[550px]'>
     
     <div className=' w-[500px] h-[100%] flex items-center  justify-center'>
           <div className='w-[85%] h-[85%] flex items-center  flex-col'>
               <h1 className='text-3xl text-center w-[70%] font-bold mb-[10px]'>
                Create Course Using AI
               </h1>
               
               <div className='mt-5 mb-3 p-[1px] border-none animate-gradient bg-gradient-to-r from-pink-500 rounded-lg via-red-500 to-yellow-500 flex items-center justify-center'>
        <div className='bg-secondary rounded-lg flex p-2'>
        <InfoIcon className='w-12 h-12 mr-3 text-blue-400 ' />
         <div className='text-[12px]'>
            Enter in a course title , or what you want to larn about . Then enter a list of units, which are the specifics you want to learn. And our AI will generate a course for you
         </div>
        </div>
        
              </div> 
               
              <div className='flex w-[100%] items-center justify-between mt-[10px] mb-3'>
                <p className='font-semibold'>
                    Title
                </p>
                <div className='w-[87%] border-[1px] p-[5px] rounded-lg pl-[10px]'>
                   {
                    isInView && (
                      <>
                        <TypeAnimation
                    className="text-[12px] text-foreground"
                    omitDeletionAnimation={false}
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      "",
                      500,
                      "Javascript"

                    ]}
                    wrapper="p"
                    speed={50}
                    style={{ fontSize: "13px"}}
                    
                    repeat={0}
                  />
                      </>
                    )
                   }

                 
                   
                </div>
               </div>

               {
                 units.map((unit , i)=>{
                    return (<>
                    <div key={i} className='flex w-[100%] items-center justify-between mt-[10px] mb-3'>
                <p className='font-semibold'>
                    Unit {i+1}
                    
                </p>
                <div className='w-[87%] border-[1px] p-[5px] rounded-lg pl-[10px]'>
                   <p>
                    {
                      isInView && (
                        <>
                         <TypeAnimation
                    className="text-[12px] text-foreground"
                    omitDeletionAnimation={false}
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      "",
                      800 * (i+1),
                      `${unit.title}`

                    ]}
                    wrapper="p"
                    speed={50}
                    style={{ fontSize: "13px"}}
                    
                    repeat={0}
                  />
                        </>
                      )
                    }
                  
                   </p>
                </div>
               </div>
                    </>)
                 })
               }

               <div className='flex w-[100%] items-center mb-3'>
                 <Separator  className='flex-1'/>
                 <Button className='bg-background text-foreground '>
                    Add Unit
                    <Plus className='text-green-500 w-[16px] ml-[2px]' />
                 </Button>
                 <Button className='bg-background text-foreground'>
                    Delete Unit
                    <Trash className='text-red-500 w-[16px] ml-[4px]' />
                 </Button>
                 <Separator  className='flex-1'/>
               </div>

               <Button className='w-[100%] bg-foreground text-background'>
                Create Course
               </Button>
               
              

           </div>
     </div>


    </div>
  );
};