import { motion } from "framer-motion";
import boxImg from "./Image/box.png";

export default function ManageSection() {
  return (
    <section className="w-full bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

       
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            WHAT ARE YOU <br />
            GOING TO MANAGE?
          </h1>

          <p className="text-gray-500 text-lg mt-6 leading-relaxed max-w-lg">
            School Management is a system to manage your multiple schools and 
            school entities such as classes, sections, students, exams, ID cards,
            admit cards, teachers, staff, fees, invoices, income, expense,
            noticeboard, study materials and much more.
          </p>

         
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 60 }}
          whileInView={{ opacity: 1, scale: 1.2, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src={boxImg}
            alt="School Management Software"
            className="w-[420px] drop-shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  )
}