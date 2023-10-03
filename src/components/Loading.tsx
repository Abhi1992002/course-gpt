import { loadingState } from '@/state/laoding';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { LoadingSvg } from './home/svg/LoadingSvg';

type LoadingProps = {}

export const Loading = ({}: LoadingProps) => {

    const setIsLoading = useSetRecoilState(loadingState)

    useEffect(()=>{
       setTimeout(()=>{
        setIsLoading(false)
       },6000)   
    })

  return (
    <div className='w-screen h-screen fixed inset-0 bg-background z-[100] flex items-center justify-center'>
       <LoadingSvg />
    </div>
  );
};