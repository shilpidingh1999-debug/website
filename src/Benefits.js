import { motion } from "framer-motion";
import teacherImg from "./Image/Online learning-amico.png";
import parentImg from "./Image/Back to school-pana.png";
import studentImg from "./Image/High School-rafiki.png";

export default function Benefits() {
  const listItem = (text) => (
    <li className="flex gap-3 items-start">
      <span className="text-orange-500 text-lg mt-1">✦</span>
      <p className="text-slate-700 leading-relaxed text-sm md:text-base">
        {text}
      </p>
    </li>
  );

  return (
    <>
      
      <section className="bg-purple-100 py-16 md:py-28 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
         
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src={teacherImg}
              alt="Benefits for Teachers"
              className="w-full max-w-xs sm:max-w-md lg:max-w-lg"
            />
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#1f3b6d] mb-2">
              Benefit For Teachers
            </h2>

            <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4">
              Accomplished, Secure Solutions
            </h3>

            <p className="text-slate-600 mb-6 leading-relaxed max-w-xl text-sm md:text-base">
              Vidyalaya student management software helps teachers focus more on
              academic tasks and less on administrative work.
            </p>

            <ul className="space-y-4">
              {[
                "Availability of more time for students",
                "Attendance and grading automation",
                "Analytical class reports",
                "Online exams, assignments & forums",
                "Student performance tracking",
                "Improved parent-teacher interaction",
              ].map((t, i) => (
                <li key={i}>{listItem(t)}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

     
      <section className="bg-blue-100 py-16 md:py-28 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

         
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center lg:order-1"
          >
            <img
              src={studentImg}
              alt="Benefits for Students"
              className="w-full max-w-xs sm:max-w-md lg:max-w-lg"
            />
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#1f3b6d] mb-2">
              Benefit For Students
            </h2>

            <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4">
              Timely, Convenient Solutions
            </h3>

            <p className="text-slate-600 mb-6 leading-relaxed max-w-xl text-sm md:text-base">
              A user-friendly system that gives students real-time access to
              academic and institutional information.
            </p>

            <ul className="space-y-4">
              {[
                "Interaction with teachers and peers",
                "Online homework & project submission",
                "School announcements & calendar",
                "Attendance, timetable & exam details",
                "Discussion forums & content sharing",
                "Alumni connectivity",
              ].map((t, i) => (
                <li key={i}>{listItem(t)}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

    
      <section className="bg-[#fdeee6] py-16 md:py-28 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-[#1f3b6d] mb-2">
              Benefit For Parents
            </h2>

            <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4">
              Reliable, Handy Solutions
            </h3>

            <p className="text-slate-600 mb-6 leading-relaxed max-w-xl text-sm md:text-base">
              Parents can stay connected with school activities, attendance,
              fees, and progress through a single portal.
            </p>

            <ul className="space-y-4">
              {[
                "Participation in school activities",
                "Events & holidays calendar",
                "Attendance, progress & fee updates",
                "Assignment tracking",
                "Instant circulars & gallery updates",
              ].map((t, i) => (
                <li key={i}>{listItem(t)}</li>
              ))}
            </ul>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src={parentImg}
              alt="Benefits for Parents"
              className="w-full max-w-xs sm:max-w-md lg:max-w-lg"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
