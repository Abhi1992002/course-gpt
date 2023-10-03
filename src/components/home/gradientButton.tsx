import React, { ReactNode } from 'react';

type GradientBorderButtonProps = {
    children : ReactNode
    onClick : ()=>void
}

export const GradientBorderButton = ({children,onClick}: GradientBorderButtonProps) => {


  return (
    <div className='relative w-[100%] z-[1]'>
   
    <button onClick={onClick} className='border-none w-[100%] rounded-lg p-[1px] animate-gradient bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div className='w-[100%] h-[100%] bg-background rounded-lg p-[12px] text-foreground'>
            {children}
        </div>
        
    </button>
    <div className='animate-gradient bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 blur-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1] w-[50%] h-[50%] rounded-[50%]'>

    </div>
    </div>
  );
};