import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <div className="inter md:px-20 tracking-[-0.6px] bg-black py-2">
        <ul className="md:text-[16px] px-2 md:px-0 text-[11px] text-wrap text-white font-medium flex flex-row justify-between">
          <li>USD</li>
          <li className="animate-pulse">FREE SHIPPING ON ALL HERMAN MILLER! FEB. 25–28. </li>
          <li>Support</li>
        </ul>
      </div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
