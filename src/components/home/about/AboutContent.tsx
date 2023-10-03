import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Circle,
  Play,
  PlayCircle,
} from "lucide-react";
import React, { useRef } from "react";
import { FeatureQuizSvg } from "../svg/feature";
import { SidebarSvg } from "../svg/sidebar";
import { VideoSvg } from "../svg/Video";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "framer-motion";
import clsx from "clsx";
import {motion} from "framer-motion"


type AboutContentProps = {};

export const AboutContent = ({}: AboutContentProps) => {

    const ref = useRef<any>()
    const isInview = useInView(ref,{
        margin:'0px 0px -300px 0px'
    })

    const bloackAnimation = {
        hidden : {
          scale:0
        },
        show : {
            scale : 1,
            transition:{
                delay:0.5,
                ease: "easeInOut", 
                duration: 0.5
                
            }
        }
    } 

    const sideAnimation = {
        hidden : {
            x:'-100%'
          },
          show : {
              x : 0,
              transition:{
                  delay:0.5,
                  ease: "easeInOut", 
                  duration: 0.5
                  
              }
          }
    }

    const item = {
        hidden : {
            opacity : 0,
            
        },
        show : (i:any) => ({
            opacity : 1,
            transition:{
                delay:0.5,
                ease: "easeInOut", 
                duration: 1
                
            }
        })
    }


    const datas = [
        {},
        {},
        {},
        {},
    
    ]

    const quizData = [
        {},
        {}
    ]


  return (
    <div ref={ref} className="flex flex-col w-[100%] h-[100%]">
      <div className="absolute top-[-50px] right-[50px] hidden lg:flex z-[100]">
        <FeatureQuizSvg />
      </div>
      <div className="absolute top-[-70px] left-[50px] hidden lg:flex z-[100]">
        <SidebarSvg />
      </div>

      {/* top-bar */}
      <div className="h-[30px] w-[100%] border-y rounded-t-lg flex items-center justify-start">
        <span className="bg-red-500 w-[10px] h-[10px] rounded-full mr-[10px] ml-[10px]"></span>
        <span className="bg-yellow-500 w-[10px] h-[10px] rounded-full mr-[10px]"></span>
        <span className="bg-green-500 w-[10px] h-[10px] rounded-full mr-[10px]"></span>
      </div>

      {/* bottom */}
      <div
        className="w-[100%] flex-1 flex"
        style={{ height: "calc( 50% - 30px )" }}
      >
        {/* sidebar */}
        <motion.div 
        variants={sideAnimation}
        initial={"hidden"}
        whileInView={"show"}
        className="hidden border flex-1 md:flex items-center justify-center">
          <div className="w-[90%] h-[90%] overflow-y-hidden hover:overflow-y-auto overflow-x-hidden">
            <h1 className="text-lg font-bold">Anthropology</h1>

            {
              datas.map((data,i)=>{
             
                return (
                <motion.div custom={i+1} initial="hidden" whileInView={"show"} variants={item} key={i}>
            <div className={clsx(`mt-[10px] transition-all ease-in-out duration-500`)}>
              <p className=" text-foreground/60 uppercase text-[12px]">
                Unit 1
              </p>
              <p className="text-sm font-bold">Introduction to Anthropolgy</p>
              <p className=" text-foreground/60 text-[12px]">
                What is Anthropolgy?
              </p>
              <p className=" text-foreground/60 text-[12px]">
                What is Anthropolgy?
              </p>
              <p className=" text-foreground/60 text-[12px]">
                What is Anthropolgy?
              </p>
            </div>
                </motion.div>)
              })
            }

        
          </div>
        </motion.div>

        {/* middle */}
        <div
        
        className=" border flex-2 flex items-center justify-center overflow-y-hidden hover:overflow-y-auto overflow-x-hidden relative">
          <div className="w-[95%] h-[90%]">
            {/* video */}
            <motion.div
             variants={bloackAnimation}
             initial={"hidden"}
             whileInView={"show"} 
            className="mb-[10px] aspect-video border flex items-center justify-center">
              <PlayCircle className="w-12 h-12 hover:scale-150 transition-all duration-300 ease-in-out hover:cursor-pointer" />
            </motion.div>
            {/* summary */}
            <div className="mb-[15px]">
              <h1 className="text-lg font-bold">Summary</h1>
              {
                isInview && (<>
                    <TypeAnimation
                    className="text-[12px] text-foreground/60"
                    omitDeletionAnimation={false}
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolor ea sed laboriosam temporibus cum repudiandae, voluptates quia. Dicta temporibus ullam repellat, accusaam voluptates quisquam nesciunt commodi provident excepturi ut? Consequatur laudantium eius veniam. Quia nemo ipsam ab officiis."
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

            {/* navigation */}
            <div className="border-t-[0.5px] absolute border-foreground pt-[10px] flex justify-between w-[95%] bottom-[30px]  ">
              {/* previous */}
              <div className="flex items-center">
                <ChevronLeftIcon className="mr-[10px]" />
                <div>
                  <p className="text-[12px] text-foreground/70">Previous</p>
                  <p className="text-sm font-bold text-foreground">
                    What is Anthropy?
                  </p>
                </div>
              </div>

              {/* next */}
              <div className="flex items-center absolute right-0">
                <div>
                  <p className="text-[12px] text-foreground/70">Previous</p>
                  <p className="text-sm font-bold text-foreground">
                    What is Anthropy?
                  </p>
                </div>
                <ChevronRightIcon className="ml-[10px]" />
              </div>
              <div></div>
            </div>
          </div>
        </div>

        {/* quiz */}
        <motion.div
         variants={bloackAnimation}
         initial={"hidden"}
         whileInView={"show"} 
        className="hidden border flex-1 lg:flex items-center justify-center overflow-y-hidden hover:overflow-y-auto overflow-x-hidden">
          <div className="w-[90%] h-[95%] overflow-y-hidden hover:overflow-y-auto overflow-x-hidden">
            <div className="mb-[20px] relative">
              <h1 className="font-bold">Concept Check</h1>
            </div>

            {/* questions */}
           {
            quizData.map((data,i)=>{
                return (
                    <>
                     <motion.div key={i+1} custom={i} variants={item} whileInView={"show"} initial="hidden" className="mb-[15px]">
              <p className="text-[12px] font-bold">
                What is the main focus of Cultural Anthropy?
              </p>

              <div className="flex items-center">
                <Circle className="w-[12px] mr-[7px]" />
                <p className="text-[12px] ">The study of humanity</p>
              </div>
              <div className="flex items-center">
                <Circle className="w-[12px] mr-[7px]" />
                <p className="text-[12px] ">the study of human psychology</p>
              </div>
              <div className="flex items-center">
                <Circle className="w-[12px] mr-[7px]" />
                <p className="text-[12px] ">study of population</p>
              </div>
              <div className="flex items-center">
                <Circle className="w-[12px] mr-[7px]" />
                <p className="text-[12px] ">study of ancient civilization</p>
              </div>
            </motion.div>
                    </>
                )
            })
           }
           

            <button className="bg-foreground text-background p-[10px] rounded-lg border">
                Check Answer
            </button>

            <div></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
