import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "./LandingPage";
import Scroll from "./Scroll";

import SCHOOL1 from "./Image/SCHOOL1.jpg";
import SCHOOL2 from "./Image/School.png";
import SCHOOL3 from "./Image/SCHOOLIMAGE1.jpg";
import SCHOOL4 from "./Image/The-Doon-School.png";
import SCHOOL5 from "./Image/Connecting.jpg";
import SCHOOL6 from "./Image/indian-students.jpg";

import rightImg from "./Image/SCHOOLIMAGE1.jpg";

export default function Home() {
  const images = [SCHOOL1, SCHOOL2, SCHOOL3, SCHOOL4, SCHOOL5, SCHOOL6];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      
      <div className="relative w-full h-screen overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[index]})` }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/50"></div>

       
        <div
          className="
            absolute 
            left-4 top-24 
            md:left-20 md:top-32
            z-10 
            p-5 
            rounded-2xl 
            w-[92%] md:w-[50%]
          "
        >
          <span className="text-white bg-white/20 px-4 py-1 rounded-full text-sm md:text-lg">
            SM
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mt-5 leading-tight">
            The School <br /> Management
          </h1>

          <p className="text-white text-sm md:text-lg lg:text-xl mt-6">
            Education & Learning Management System. One application managing the
            whole school — reduce complexity, increase transparency, and make
            data-driven decisions.
          </p>

          
        </div>
      </div>

     
      <div className="w-full py-16 px-4 md:px-6 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              <span className="text-yellow-500">WHY </span>
              <span className="text-yellow-400">THE SM </span>
              <span className="text-blue-400">IS UNIQUE </span>
              <span className="text-blue-300">IN OFFERINGS</span>
            </h1>

            <div className="w-24 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full my-4"></div>

            <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
              Built specifically for institutes and training organizations,{" "}
              <strong>The School Management</strong> covers every department
              end-to-end with a unified digital ecosystem.
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
              Admissions, operations, finance, automation — all under one roof.
              Designed to help institutions grow smarter and faster.
            </p>
          </motion.div>

          <motion.div className="flex justify-center">
            <motion.img
              src={rightImg}
              alt="school"
              className="rounded-3xl shadow-2xl w-full md:w-[95%]"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>

     
      <div className="py-20 px-4 md:px-6 bg-[#f8faff]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold mb-14"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
            EMPOWERING INSTITUTIONS WITH SMART TOOLS
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2 md:p-10">
          {[
            {
              icon: "📱",
              title: "Mobile App Integration",
              desc: "Access everything on the go with ease.",
            },
            {
              icon: "🛡️",
              title: "Secure & Reliable",
              desc: "Top-tier security to protect your data.",
            },
            {
              icon: "⚙️",
              title: "All-in-One Solution",
              desc: "Students, staff, fees, exams & more.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                p-8 rounded-3xl text-center shadow-lg bg-white
                transition-all duration-700
                hover:scale-105 hover:shadow-2xl
                hover:text-white
                hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-500
              "
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="opacity-80 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Scroll />
      <LandingPage />
    </>
  );
}
