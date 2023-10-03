"use client"

import { modeState } from "@/state/mode";
import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function GlobeClient() {
  const canvasRef = useRef<any>(null);

  const [width,setWidth] = useState(0);
  const [mode,setMode]= useRecoilState(modeState)

  useEffect(()=>{
    const onResize = () => canvasRef.current && ( setWidth(canvasRef.current.offsetWidth));
       
    window.addEventListener("resize", onResize);
    onResize()
  })

  useEffect(()=>{
    localStorage.getItem('theme') === 'dark' ? setMode(1) : setMode(0)
  },[])
  

  useEffect(() => {
    let phi = 0;
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width,
      height: width,
      phi: 0,
      theta: 0,
      dark: mode,
      diffuse: 1.2,
      offset:[width,-width],
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.3, 0.3, 0.3],
      scale:1.3,
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 }
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.008;
      }
    },);

    console.log(width)

    return () => {
      globe.destroy();
    };
  },[width,mode]);

  

  return (
  
  <canvas
        ref={canvasRef}
        style={{  width: "100%",
        height: "100%",maxWidth:'1200px' ,aspectRatio:'1'}}
      />

    

  );
}
