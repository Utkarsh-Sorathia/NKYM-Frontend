interface SectionDividerProps {
  /** Background of the divider itself — should match the section above it */
  bgClassName: string;
  /** Fill of the wave shape — should match the section below it */
  waveClassName: string;
}

/**
 * A soft wave transition between two flat-color sections, with a couple of
 * small gold accent dots along the crest (a light nod to a marigold garland).
 * Not used between the Hero and the next section — a flat wave over a busy
 * photo background reads as a mistake, not a decoration.
 */
const SectionDivider: React.FC<SectionDividerProps> = ({ bgClassName, waveClassName }) => (
  <div className={`w-full ${bgClassName} overflow-hidden`} aria-hidden="true">
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block w-full h-8 md:h-14">
      <path
        d="M0,40 C240,75 480,5 720,40 C960,75 1200,5 1440,40 L1440,80 L0,80 Z"
        className={waveClassName}
      />
      <circle cx="420" cy="18" r="4" className="fill-gold-400" opacity="0.8" />
      <circle cx="1020" cy="18" r="4" className="fill-gold-400" opacity="0.8" />
    </svg>
  </div>
);

export default SectionDivider;
