import React from 'react';
import clsx from 'clsx';

type BackgroundProps = {}

const Background = ({}: BackgroundProps) => {

  return (

      <div className='w-screen h-screen fixed top-0 z-[-1] pointer-events-none opacity-[0.5] invert-inverts' style={{backgroundImage:'url("/grid.svg")'}}>
      </div> 

  );
};

export default Background