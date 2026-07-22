import { useId } from 'react';

/**
 * A very low-opacity repeating five-dot "flower" lattice used as ambient
 * texture behind light sections. useId() keeps the SVG pattern id unique so
 * multiple instances on one page don't collide.
 */
const BackgroundPattern: React.FC = () => {
  const patternId = useId();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]" aria-hidden="true">
      <svg width="100%" height="100%">
        <defs>
          <pattern id={patternId} width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="2.5" className="fill-gold-700" />
            <circle cx="18" cy="18" r="1.5" className="fill-gold-700" />
            <circle cx="42" cy="18" r="1.5" className="fill-gold-700" />
            <circle cx="18" cy="42" r="1.5" className="fill-gold-700" />
            <circle cx="42" cy="42" r="1.5" className="fill-gold-700" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

export default BackgroundPattern;
