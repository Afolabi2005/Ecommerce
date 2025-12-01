import React from "react";
import NYT from '../../assets/NYTimes.svg'
import Vogue from "../../assets/Vogue.svg";
import VanityFair from "../../assets/VanityFair.svg";
import CNimg from "../../assets/CNimg.svg";

const Hero = () => {
  return (
    <div className="public-sans">
      <div className="py-10 flex justify-center items-center text-center flex-col gap-4">
        <h1 className="text-center md:text-[56px] md:leading-16 leading-10 text-[42px] md:tracking-[-2.4px] font-semibold">
          Better clothing for the planet
        </h1>
        <p className="text-[20px] text-wrap px-[5%] md:px-[20%] text-[#979797]">
          Create screens directly in Method or add your images from Sketch or
          Figma. You can even sync designs from your cloud storage!
        </p>
        <button className="py-3 px-14 text-[16px] font-semibold border">
          Shop All
        </button>
        <div className="h-[521px] w-screen md:w-[1114px] bg-[#c4c4c4] border mt-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 justify-bwteen px-4 md:px-0 items-center gap-12 mt-4">
          <img src={NYT} alt="" />
          <img src={Vogue} alt="" />
          <img src={VanityFair} alt="" />
          <img src={CNimg} alt="" />
        </div>
      </div>
      <div className="md:p-20 p-10 flex justify-center items-center text-center flex-col gap-4">
        <h1 className="text-center text-[36px] md:text-[56px] tracking-[-2.4px] font-semibold">
          Our latest arrivals
        </h1>
        <p className="text-[20px] md:text-wrap text-center md:px-[20%] text-[#979797]">
          Create screens directly in Method or add your images from Sketch or
          Figma. You can even sync designs from your cloud storage!
        </p>
        <button className="py-3 px-14 text-[16px] font-semibold border">
          Shop All
        </button>
        <div className="flex flex-col md:flex-row justify-between pt-30 items-center gap-4">
            <div className="h-[521px] w-[368px] bg-[#c4c4c4] border-none"></div>
            <div className="h-[521px] w-[368px] bg-[#c4c4c4] md:-mt-40 border-none"></div>
            <div className="h-[521px] w-[368px] bg-[#c4c4c4] border-none"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
