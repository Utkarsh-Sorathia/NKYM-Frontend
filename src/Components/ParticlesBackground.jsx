import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
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
          className="absolute inset-0 z-0 pointer-events-none"
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "bubble",
                },
              },
              modes: {
                bubble: {
                  distance: 200,
                  duration: 2,
                  opacity: 0.8,
                  size: 10,
                  color: { value: "#ffd700" }
                },
              },
            },
            particles: {
              color: {
                value: ["#ffd700", "#ff8c00", "#ff4500", "#ffffff"],
              },
              move: {
                direction: "top",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: true,
                speed: { min: 1, max: 3 },
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 100,
              },
              opacity: {
                value: { min: 0.1, max: 0.6 },
                animation: {
                  enable: true,
                  speed: 1,
                  sync: false,
                }
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
                }
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