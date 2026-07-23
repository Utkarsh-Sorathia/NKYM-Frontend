import { motion } from 'framer-motion';

const PETAL_COUNT = 20;
const RING_RADIUS = 92;
const CENTER = 100;

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const angle = (i / PETAL_COUNT) * 2 * Math.PI;
  return {
    x: CENTER + RING_RADIUS * Math.cos(angle),
    y: CENTER + RING_RADIUS * Math.sin(angle),
  };
});

const AnniversaryMedallion: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1, type: 'spring' }}
      className="flex flex-col items-center mb-1 md:mb-6"
    >
      <div className="relative w-14 h-14 md:w-32 md:h-32">
        {/* Traditional dotted ring, drawn procedurally so no external asset is needed */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="medallionRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3c765" />
              <stop offset="100%" stopColor="#935619" />
            </linearGradient>
          </defs>
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RING_RADIUS + 2}
            fill="none"
            stroke="url(#medallionRing)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          {petals.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#f3c765" opacity="0.85" />
          ))}
        </svg>

        {/* Medallion face */}
        <div className="absolute inset-[10%] rounded-full bg-linear-to-br from-gold-300 via-gold-500 to-gold-700 shadow-lg shadow-maroon-950/60 border-2 border-gold-200/60 flex flex-col items-center justify-center">
          <span className="font-display text-base md:text-4xl font-extrabold text-maroon-950 leading-none">
            10
          </span>
          <span className="font-display text-[6px] md:text-[10px] font-bold text-maroon-900 tracking-[0.2em] uppercase mt-0.5">
            Years
          </span>
        </div>
      </div>

      <span className="mt-1 md:mt-3 font-display text-[9px] md:text-sm font-semibold tracking-[0.25em] uppercase text-gold-200 drop-shadow-md">
        2017 – 2026
      </span>
    </motion.div>
  );
};

export default AnniversaryMedallion;
