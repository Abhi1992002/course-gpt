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
    <div className='py-auto mx-auto max-w-7xl'>
      <Background />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center'>
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