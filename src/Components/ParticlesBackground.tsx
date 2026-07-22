import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

const ParticlesBackground: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 z-1 pointer-events-none"
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: canHover,
                  mode: "bubble",
                },
              },
              modes: {
                bubble: {
                  distance: 200,
                  duration: 2,
                  opacity: 0.6,
                  size: 8,
                  color: { value: "#f3c765" },
                },
              },
            },
            particles: {
              color: {
                value: ["#f3c765", "#edac3a", "#fcf0d1"],
              },
              move: {
                direction: "top",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: true,
                speed: { min: 0.5, max: 1.5 },
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 800,
                  height: 800,
                },
                value: 36,
              },
              opacity: {
                value: { min: 0.1, max: 0.5 },
                animation: {
                  enable: true,
                  speed: 1,
                  sync: false,
                },
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
                animation: {
                  enable: true,
                  speed: 2,
                  sync: false,
                },
              },
              wobble: {
                enable: true,
                distance: 5,
                speed: 10,
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
};

export default ParticlesBackground;
