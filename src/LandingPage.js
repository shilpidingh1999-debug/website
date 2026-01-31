import { motion } from "framer-motion";
import Illustration from "./Illustration";
import whyus from "./Image/Learning-cuate.png";
import visionImg from "./Image/Graduation-cuate.png";

export default function LandingPage() {
  const testimonials = [
    {
      name: "Mr. Ashim Dubey",
      role: "Principal, Bhartiya Vidya Bhavan's Prism School, MP",
      text:
        "Vidyalaya is very efficient, systematic and user-friendly. It helped us track every activity and data of our school.",
    },
    {
      name: "Ms. Sudhakshina",
      role: "Principal, Shemford School, Tamilnadu",
      text:
        "We have been using Vidyalaya for two years. It is complete, accurate and the support system is superb 24×7.",
    },
    {
      name: "Ms. Neeta Dagar",
      role: "Principal, Rockford Convent School, Gurgaon",
      text:
        "Vidyalaya is a complete school ERP. Highly recommended for schools looking for advanced solutions.",
    },
  ];

  return (
    <>
      
      <section className="bg-gradient-to-br from-orange-50 via-pink-50 to-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="text-blue-900 font-semibold mb-2 text-sm md:text-base">
              About ShiksaSetu
            </h4>

            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-5">
              Our Journey
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm md:text-[15px]">
              Launched in 2002, ShiksaSetu provides an end-to-end cloud
              management solution for educational institutions.
              <br /><br />
              Our ERP builds strong communication channels with teachers,
              students, parents and alumni.
              <br /><br />
              Trusted by institutions across 25+ states in India and
              8+ countries worldwide.
            </p>
          </motion.div>

          <Illustration />
        </div>
      </section>

    
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-orange-100 to-yellow-100" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img src={whyus} alt="Why Us" className="w-full max-w-xs md:max-w-md" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-5">
              Why Us?
            </h2>

            <p className="text-slate-600 mb-4 text-sm md:text-base">
              A perfect school management software has speed, security,
              accuracy, and a wide range of modules.
            </p>

            <p className="text-slate-600 mb-4 text-sm md:text-base">
              Cloud-based access ensures data availability anytime with
              automated backups.
            </p>

            <p className="text-slate-600 text-sm md:text-base">
              High speed, portability, and secure data storage compared
              to traditional systems.
            </p>
          </motion.div>
        </div>
      </section>

 
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-pink-50 to-yellow-50" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Vision
            </h2>

            <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">
              Empower educational services to provide better learning
              possibilities through technology.
            </p>

            <ul className="space-y-4">
              {[
                "Deliver high-quality institutional features",
                "Unified communication platform",
                "Ethical & advanced technology usage",
                "Long-term institutional partnerships",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-orange-500">✦</span>
                  <p className="text-slate-700 text-sm md:text-base">{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <img src={visionImg} alt="Vision" className="w-full max-w-xs md:max-w-md" />
          </motion.div>
        </div>
      </section>

     
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fde7de] via-[#fdeee8] to-white" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto px-4 md:px-6"
        >
          <div className="text-center mb-14">
            <h4 className="text-gray-600 text-sm md:text-lg">Testimonials</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Story, <span className="text-orange-500">Our Clients</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl shadow-lg p-6 relative"
              >
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-2xl px-3 py-1 rounded-bl-xl">
                  “”
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center font-bold text-orange-700">
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">{item.role}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  “{item.text}”
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
