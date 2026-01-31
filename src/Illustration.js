import { motion } from "framer-motion";

export default function Illustration() {
  return (
    <div className="w-full flex justify-center overflow-hidden">
      <motion.svg
        viewBox="0 0 600 450"
        preserveAspectRatio="xMidYMid meet"
        className="
          w-full 
          max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[520px]
          h-auto
        "
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
       
        <path
          d="M80 80 C20 200 80 380 280 400 C460 420 600 300 560 160 C520 40 360 20 240 60 C160 90 120 40 80 80Z"
          fill="#FFE6DB"
        />

       
        <path
          d="M120 340 Q200 300 260 260 Q320 220 380 200 Q460 180 500 140"
          stroke="#FB7185"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

       
        {[
          { x: 120, y: 340 },
          { x: 260, y: 260 },
          { x: 380, y: 200 },
          { x: 500, y: 140 },
        ].map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="14"
            fill="#fff"
            stroke="#FB7185"
            strokeWidth="5"
          />
        ))}

       
        <circle cx="120" cy="300" r="14" fill="#F97316" />
        <rect x="108" y="316" width="24" height="44" rx="10" fill="#2563EB" />

       
        <circle cx="260" cy="220" r="14" fill="#F59E0B" />
        <rect x="248" y="236" width="24" height="44" rx="10" fill="#EA580C" />
        <rect x="240" y="260" width="40" height="18" rx="6" fill="#1E3A8A" />

        <circle cx="500" cy="100" r="14" fill="#FB7185" />
        <rect x="488" y="116" width="24" height="44" rx="10" fill="#1D4ED8" />

       
        <circle cx="260" cy="290" r="10" fill="#22C55E" />
        <circle cx="380" cy="230" r="10" fill="#0EA5E9" />
        <circle cx="500" cy="180" r="10" fill="#FACC15" />
      </motion.svg>
    </div>
  );
}
