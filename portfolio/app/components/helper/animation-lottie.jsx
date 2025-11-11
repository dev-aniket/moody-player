"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const AnimationLottie = ({ animationPath }) => {
  return <Lottie animationData={animationPath} loop autoplay style={{ width: "95%" }} />;
};

export default AnimationLottie;
