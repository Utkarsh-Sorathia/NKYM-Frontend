import { GiLotus } from 'react-icons/gi';

/**
 * Replaces the plain solid underline bar below section headings with a
 * thin-line / lotus / thin-line accent — a small traditional touch inside an
 * otherwise minimal, modern divider shape.
 */
const HeadingAccent: React.FC = () => (
  <div className="flex items-center justify-center gap-3" aria-hidden="true">
    <span className="h-px w-10 md:w-16 bg-gold-400/70" />
    <GiLotus className="text-gold-500 text-lg md:text-xl" />
    <span className="h-px w-10 md:w-16 bg-gold-400/70" />
  </div>
);

export default HeadingAccent;
