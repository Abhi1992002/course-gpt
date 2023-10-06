import React from "react";

type UpperSvgProps = {};

export function UpperSvgGreen({}: UpperSvgProps) {
  return (
    <>
      <div className="absolute translate-x-[-48%] top-[50%]">
        <svg
          width="57"
          height="134"
          className=" z-[1]"
          viewBox="0 0 57 146"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M54.7764 0L54.7765 17.4851C54.7765 31.8231 48.5879 45.635 37.4432 56.1691C26.2986 66.7038 20.1099 80.5156 20.1099 94.8536V129"
            stroke="url(#paint0_linear_228_9906)"
            strokeWidth="3"
          />
          <g filter="url(#filter0_diii_228_9906)">
            <path
              d="M19.848 123.174C17.7228 123.174 16 124.677 16 126.532C16 128.387 17.7228 129.891 19.848 129.891C21.9732 129.891 23.696 128.387 23.696 126.532C23.696 124.677 21.9732 123.174 19.848 123.174Z"
              fill="black"
            />
            <path
              d="M19.848 123.957C18.2179 123.957 16.8965 125.11 16.8965 126.532C16.8965 127.955 18.2179 129.108 19.848 129.108C21.478 129.108 22.7994 127.955 22.7994 126.532C22.7994 125.11 21.478 123.957 19.848 123.957Z"
              stroke="white"
              strokeWidth="3"
            />
          </g>
          <defs>
            <filter
              id="filter0_diii_228_9906"
              x="0.396484"
              y="107.457"
              width="38.903"
              height="38.1519"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="7.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.337255 0 0 0 0 0.827451 0 0 0 0 0.395098 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_228_9906"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_228_9906"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="7.5" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.337255 0 0 0 0 0.827451 0 0 0 0 0.392157 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect2_innerShadow_228_9906"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="10" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.337255 0 0 0 0 0.827451 0 0 0 0 0.392157 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="effect2_innerShadow_228_9906"
                result="effect3_innerShadow_228_9906"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.337255 0 0 0 0 0.827451 0 0 0 0 0.392157 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="effect3_innerShadow_228_9906"
                result="effect4_innerShadow_228_9906"
              />
            </filter>
            <linearGradient
              id="paint0_linear_228_9906"
              x1="41.6271"
              y1="2.54351e-09"
              x2="42.31"
              y2="253"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0515742" stopColor="#196C2E" stopOpacity="0" />
              <stop offset="0.225992" stopColor="#2EA043" />
              <stop offset="0.47249" stopColor="#2EA043" />
              <stop offset="0.522324" stopColor="#56D364" />
              <stop offset="0.561417" stopColor="#2EA043" />
              <stop offset="0.791714" stopColor="#2EA043" />
              <stop offset="0.956186" stopColor="#196C2E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="w-[3px]  h-[20vh]  bg-green-500" />

      <div className="home-campaign-glowing-icon-glow-1 w-[4px] h-[20vh] absolute left-[50%] translate-x-[50%]" />
    </>
  );
}
