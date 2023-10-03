import React, { useEffect, useState } from 'react';
import {motion} from "framer-motion"
type LoadingSvgProps = {}

export const LoadingSvg = ({}: LoadingSvgProps) => {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  const pathVariant = {
	hidden : {
		pathLength : 0,
		fill:"black"
	},
	show : {
		pathLength : 1,
		fill:"white",
		transition : {
			duration : 100
		}
	}
  }

  return (
    <>
  <svg height="100" stroke="#bac736" stroke-width="2" className="text-line stroke-current text-orange-500" width="100%"><text x="50%" dominant-baseline="middle" text-anchor="middle" y="50%">Course GPT</text></svg>



    </>
  );
};