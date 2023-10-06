"use client";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <div className="w-full sm:h-[100vh] h-[120vh] sm:min-h-80vh flex items-end justify-center bg-black">
      <div className="md:w-[85%]  w-full px-4 text-white flex flex-col">
        <div className="w-full text-7xl font-bold">
          <h1 className="w-full md:w-2/3">How can we help you. get in touch</h1>
        </div>
        <div className="flex mt-8 flex-col md:flex-row md:justify-between">
          <p className="w-full md:w-2/3 text-gray-400">
            Hey want to contact me, you can use twitter for fast reply
          </p>
          <div className="w-44 pt-6 md:pt-0">
            <Link
              href={"https://twitter.com/abhiY2045"}
              className="bg-red-500 justify-center text-center rounded-lg shadow px-10 py-3 flex items-center"
            >
              Contact Me
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex mt-24 mb-12 flex-row justify-between">
            <div className="">
              <h1 className=" font-bold text-2xl">Course GPT</h1>
            </div>
            <Link
              href="/gallery"
              className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase"
            >
              Gallery
            </Link>
            <div className="flex flex-row space-x-8 items-center justify-between">
              <Link href="https://twitter.com/abhiY2045">
                <TwitterIcon className="w-5 h-5" />
              </Link>
              <Link href="https://github.com/Abhi1992002">
                <GithubIcon className="w-5 h-5 fill-white" />
              </Link>
            </div>
          </div>
          <hr className="border-gray-600" />
          <p className="w-full text-center my-12 text-gray-600">
            Copyright © 2023 courseGPT
          </p>
        </div>
      </div>
    </div>
  );
}
