import React from "react";
import { motion } from "framer-motion";
import doodles from "./Image/2151931209.jpg"
import  kids from  "./Image/11481919.png"
import missionImg  from "./Image/2151931209.jpg"
import benefitsImg from "./Image/Online learning-bro.png";
import Benefits from "./Benefits"

 function About(){
    return(
        <>
        <div className="relative w-full pt-10 bg-gradient-to-b from-blue-50 to-white py-0 px-5 md:px-9 overflow-hidden">

    
      <img
        src={doodles}
        className="absolute inset-0 w-full h-full object-cover opacity-35"
        alt="Background"
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-3">

      
        <div className="space-y-5">

          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-500 leading-tight">
            THE SCHOOL <br /> MANAGEMENT
          </h1>

          <div className="h-1.5 w-60 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 rounded-full"></div>

          <p className="text-pink-900 text-2xl font-extrabold">
            Streamline your school's administrative tasks, student management, and fee
            tracking — all in one modern platform.
          </p>

          <p className="text-gray-900 text-xl font-semibold">
            Excellence in Education & Technology Solutions
          </p>

         
        </div>

       
        <div className="flex justify-center">
          <img
            src={kids}
            alt="Kids"
           className="w-[430px] md:w-[500px] drop-shadow-2xl animate-fadeIn mix-blend-normal"
          />
        </div>

      </div>
    </div>

    <div className="w-full bg-[#f7f9fc] text-gray-800">

      
     

    
      <section className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Who We Are</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our School Management System is designed to simplify and automate
            school administration. It helps administrators manage students,
            teachers, classes, attendance, and fees from a single powerful
            dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-10"
        >
          <h3 className="text-2xl font-semibold mb-2">Our Goal</h3>
          <p className="text-gray-600">
            To reduce paperwork, improve accuracy, and bring transparency into
            school operations through technology.
          </p>
        </motion.div>
      </section>

</div>



      <section className="bg-slate-100 py-16">
  <div className="max-w-1xl mx-auto px-4">
    
    <div className="
      bg-gradient-to-r from-[#0f172a] via-yellow-400 to-[#020617]
      rounded-3xl
      py-14 px-6
      shadow-2xl
      text-center
    ">
      <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
        Shiksh Setu – A Complete Student Management <br />
        System Software
      </h1>
    </div>

  </div>
</section>


      <section className="bg-green-100 py-8">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">

       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
         
          <p className="text-sm font-semibold text-[#1f3b6d] mb-4">
            Interested!
          </p>

         
          <h2 className="text-4xl md:text-5xl font-bold text-[#1f3b6d] leading-tight mb-8">
            Benefits Of Student <br />
            Management <br />
            Software...
          </h2>

          
          <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
            The school management system proposes a common automated
            platform for school administration, learners, tutors,
            and parents with salient benefits. It provides a
            cost-effective solution for campus and school management.
            The implementation of modern communication techniques
            simplifies interaction between parents, school management,
            and students. The cloud-based system ensures security and
            data safety while offering advanced features that enhance
            overall efficiency.
          </p>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-end"
        >
          <img
            src={benefitsImg}
            alt="Student Management Benefits"
            className="w-full max-w-lg"
          />
        </motion.div>

      </div>
    </section>

<Benefits/>

            
                <div className="w-full  bg-gradient-to-r from-purple-900 via-pink-400 to-blue-800 text-white py-8 px-6 md:px-20  rounded-[60px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            
                  
                    <div className="space-y-6">
                      <h2 className="text-4xl md:text-5xl font-bold text-orange-400">
                        Our Mission
                      </h2>
            
                      <p className="text-lg leading-8 opacity-90">
                        Our journey began with a clear purpose — to design a connected and
                        intelligent system that simplifies education management for schools
                        and institutions. In the pre-digital era, schools faced fragmented
                        workflows — piles of paperwork, scattered communication, and
                        repetitive administration. We envisioned a structured, geometric
                        solution — one platform that aligns every function, streamlines
                        processes, and enhances collaboration with precision and efficiency.
                      </p>
            
                      <p className="text-lg leading-8 opacity-90">
                        When the world shifted during the COVID-19 pandemic, education
                        entered a new dimension. Classrooms became virtual, and schools had
                        to adapt overnight. We evolved our platform into a seamless digital
                        ecosystem — empowering institutions with online learning, real-time
                        communication, and dynamic management tools. Today, our mission
                        continues with sharper focus: to empower schools to operate smarter,
                        faster, and stronger in a connected world.
                      </p>
                    </div>
            
                    
                    <div className="relative flex justify-center">
            
                     
                      <div className="absolute w-[380px] h-[380px] rounded-full
                        bg-gradient-to-r from-purple-600 via-pink-500 to-orange-600
                        blur-[90px] opacity-80">
                      </div>
            
                     
                      <div className="relative z-10 border-4 border-pink-400 rounded-full p-3">
                        <img
                          src={missionImg}
                          alt="team"
                          className="w-[320px] h-[320px] object-cover rounded-full shadow-2xl"
                        />
                      </div>
            
                     
                      <span className="absolute top-5 right-10 text-yellow-400 text-4xl">🎓</span>
                      <span className="absolute bottom-5 right-5 text-green-500 text-4xl">📘</span>
                      <span className="absolute bottom-10 left-10 text-cyan-400 text-4xl">💡</span>
            
                    </div>
                  </div>
                </div>
            <br />
           
                  <section className="py-20 bg-[#f0f4ff] text-center px-6">
                    <motion.h2
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-4xl font-bold mb-6"
                    >
                      Summary
                    </motion.h2>
            
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed"
                    >
                      Our School Management System offers a complete admin-driven solution
                      for managing school operations digitally. With features like student,
                      teacher, attendance, class, and fees management, the system ensures
                      efficiency, accuracy, and transparency across the institution.
                    </motion.p>
                  </section>
       
          
        </>
    );
 }

 export default About;