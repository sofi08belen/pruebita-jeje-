declare module "*.png";

import backgroundImage from "../imports/image.png";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Componente de texto tipo máquina de escribir
function TypewriterText({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }
      },
      delay + currentIndex * 0,
    );

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <motion.p
      className="text-white/90 text-xl md:text-2xl lg:text-3xl tracking-wide"
      style={{
        fontFamily: "Syne, sans-serif",
        fontWeight: 400,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 5, delay: delay / 1000 }}
    >
      {displayedText}
      <motion.span
        className="inline-block w-[3px] h-[1.2em] bg-white ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </motion.p>
  );
}

// Componente de partículas flotantes
function FloatingParticles() {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            filter: "blur(1px)",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Componente de destellos
function Sparkles() {
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          <div className="w-2 h-2 bg-white relative">
            <div className="absolute inset-0 bg-white blur-sm"></div>
            <div className="absolute inset-0 bg-white rotate-45"></div>
            <div className="absolute inset-0 bg-white -rotate-45"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div
      className="size-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay oscuro animado */}
      <motion.div
        className="absolute inset-0 bg-black/20"
        animate={{
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Destellos */}
      <Sparkles />

      {/* Efecto de aurora en movimiento */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.3), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Título AURA con efecto de brillo */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex flex-col items-center gap-6"
        >
          <div className="relative">
            <motion.h1
              className="text-white text-[120px] md:text-[180px] lg:text-[220px] leading-none tracking-tight relative"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                textShadow:
                  "0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(138, 43, 226, 0.25), 0 0 60px rgba(75, 0, 130, 0.2)",
              }}
            >
              AURA
            </motion.h1>
          </div>

          {/* Texto tipo máquina de escribir */}
          <TypewriterText
            text="Toma decisiones y construye tu camino paso a paso"
            delay={50}
          />
        </motion.div>

        {/* Botones con animaciones */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          
          <motion.button
            className="px-8 py-3 bg-white text-black rounded-full text-lg relative overflow-hidden"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(255, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
          > 
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0"
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <span className="relative">Iniciar sesión</span>
          </motion.button>



          <motion.button
            className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-full text-lg relative overflow-hidden"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              boxShadow: "0 0 30px rgba(255, 255, 255, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0"
              whileHover={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <span className="relative">Regístrate</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

