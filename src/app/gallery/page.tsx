import { GalleryCourseCard } from '@/components/GalleryCourseCard';
import Background from '@/components/background/page';
import { prisma } from '@/lib/db';
import React from 'react';

type GalleryPageProps = {}

 const GalleryPage = async ({}: GalleryPageProps) => {

    const courses = await prisma.course.findMany({
        include :{
            units :{
                include:{
                    chapters:true
                }
            }
        }
    })

  return (
    <div className='py-auto mx-auto max-w-8xl'>
      <Background />
      <div className='flex gap-4 flex-wrap items-center justify-center mt-[100px]'>
          {
            courses.map(course => {
                return <GalleryCourseCard course={course} key={course.id}/>
            })
          }
      </div>
    </div>
  );
};

export default GalleryPage;