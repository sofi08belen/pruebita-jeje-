import backgroundImage from "../imports/image.png";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { RegistroForm } from "../pages/Register";
import { LoginForm } from "../pages/Login";


// ── Typewriter ──────────────────────────────────────────────

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, delay + currentIndex * 30);
    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <motion.p
      className="text-white/90 text-xl md:text-2xl lg:text-3xl tracking-wide"
      style={{ fontFamily: "Syne, sans-serif", fontWeight: 400 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
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




// ── Partículas ──────────────────────────────────────────────
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);
  useEffect(() => {
    setParticles(Array.from({ length: 30 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 4 + 1, duration: Math.random() * 10 + 10,
    })));
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-white/60"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, filter: "blur(1px)", boxShadow: "0 0 10px rgba(255,255,255,0.8)" }}
          animate={{ y: [0, -30, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Destellos ───────────────────────────────────────────────
function Sparkles() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  useEffect(() => {
    setSparkles(Array.from({ length: 15 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 5,
    })));
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((s) => (
        <motion.div key={s.id} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        >
          <div className="w-2 h-2 bg-white relative">
            <div className="absolute inset-0 bg-white blur-sm" />
            <div className="absolute inset-0 bg-white rotate-45" />
            <div className="absolute inset-0 bg-white -rotate-45" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── App principal ───────────────────────────────────────────
export default function App() {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  // Cuando el usuario presiona "Volver al inicio" desde Login o Register
  if (mostrarRegistro) {
    return <RegistroForm onVolver={() => setMostrarRegistro(false)} />;
  }
  if (mostrarLogin) {
    return <LoginForm onVolver={() => setMostrarLogin(false)} />;
  }

  return (
    <div
      className="size-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    >
      <motion.div className="absolute inset-0 bg-black/20"
        animate={{ opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <FloatingParticles />
      <Sparkles />
      <motion.div className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(138,43,226,0.3), transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex flex-col items-center gap-6"
        >
          <motion.h1
            className="text-white text-[120px] md:text-[180px] lg:text-[220px] leading-none tracking-tight"
            style={{
              fontFamily: "Syne, sans-serif", fontWeight: 800,
              textShadow: "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(138,43,226,0.25), 0 0 60px rgba(75,0,130,0.2)",
            }}
          >
            AURA
          </motion.h1>
          <TypewriterText text="Toma decisiones y construye tu camino paso a paso" delay={700} />
        </motion.div>

        <motion.div className="flex gap-4"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.button
            onClick={() => setMostrarLogin(true)}
            className="px-8 py-3 bg-white text-black rounded-full text-lg"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Iniciar sesión
          </motion.button>

          <motion.button
            onClick={() => setMostrarRegistro(true)}
            className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-full text-lg"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)", boxShadow: "0 8px 25px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Regístrate
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
