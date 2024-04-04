"use client";
import React from "react";
import { BoxesContainer } from "@/components/coming-soon";
import { twMerge } from "tailwind-merge";
import { InfinitySpin } from "react-loader-spinner";

const ComingSoon = () => {
  return (
    <div className="relative flex h-96 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-900 ">
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />

      <BoxesContainer />
      <h1
        className={twMerge(
          "relative !m-0 text-wrap !p-0 px-4 text-2xl font-semibold text-white md:text-4xl",
          // CalSans.className,
        )}
      >
        LeaderBoard
      </h1>
      <p className="relative z-20 mt-2 text-center text-neutral-300">
        Stary tuned. Our developers are working on this feature!
      </p>

      <div className="items center flex h-40 w-40 justify-center">
        <InfinitySpin color="#4fa94d" />
      </div>
    </div>
  );
};

export default ComingSoon;
