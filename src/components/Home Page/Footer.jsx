import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col px-10 sm:flex-row md:flex-row justify-between items-center  md:p-20">
      <div className="public-sans md:max-w-[450px]">
        <p className="md:text-[36px] text-[24px] font-semibold text-black tracking-[-1.5px]">
          Sign up for our newsletter
        </p>
        <p className="text-[14px] font-normal pr-10 text-black tracking-[-0.3px]">
          Be the first to know about our special offers, new product launches,
          and events
        </p>
        <div className="flex justify-between max-w-[400px] mt-8 px-4 py-2 border flex-row">
          <input
            type="email"
            placeholder="Email address"
            className="text-[14px] font-normal outline-none w-[80%] text-black tracking-[-0.3px]"
          />
          <button className="text-[14px] font-bold text-black tracking-[-0.3px]">Sign Up</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-20 public-sans">
        <div>
          <p className="text-[16px] font-semibold text-[#111111] pb-4 tracking-[-0.4px]">Shop</p>
          <ul className="text-[16px] font-medium text-[#11111170] tracking-[-0.2px]">
            <li>Women's</li>
            <li>Men's</li>
            <li>Kids</li>
            <li>Shoes</li>
            <li>Equipment</li>
            <li>By Activity</li>
            <li>Gift Cards</li>
            <li>Sale</li>
          </ul>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-[#111111] pb-4 tracking-[-0.4px]">Help</p>
          <ul className="text-[16px] font-medium text-[#11111170] tracking-[-0.2px]">
            <li>Help Center</li>
            <li>Order Status</li>
            <li>Size Chart</li>
            <li>Returns & Warranty</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-[#111111] pb-4 tracking-[-0.4px]">About</p>
          <ul className="text-[16px] font-medium text-[#11111170] tracking-[-0.2px]">
            <li>About Us</li>
            <li>Responsibility</li>
            <li>Technology and Innovation</li>
            <li>Explore our stories</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
