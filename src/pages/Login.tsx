import { motion } from 'motion/react';
import { useState } from 'react';
import videoBackground from '../imports/Modern_Kids_Craft_Ideas_to_Refresh_Your_Routine_-_Pin-482940760053419111.mp4';

interface LoginFormProps {
  onVolver: () => void;
}

export function LoginForm({ onVolver }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Conecta al backend real ──────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensaje('');

    if (!email || !password) {
      setMensaje('Todos los campos son obligatorios');
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.error || 'Email o contraseña incorrectos');
        setIsSuccess(false);
        return;
      }

      // Login exitoso — detecta primer acceso o regreso
      setMensaje(
        data.primerAcceso
          ? `¡Bienvenido por primera vez, ${data.usuario.nombre}! 🎉`
          : `¡Bienvenido de nuevo, ${data.usuario.nombre}! 👋`
      );
      setIsSuccess(true);

      // Vuelve a la pantalla principal después de 2 segundos
      setTimeout(() => onVolver(), 2000);

    } catch {
      setMensaje('No se pudo conectar con el servidor. ¿Está corriendo el backend?');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  }
  // ────────────────────────────────────────────────────────

  return (
    <div className="size-full relative overflow-hidden flex items-center justify-center">

      {/* ── Video de fondo ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoBackground} type="video/mp4" />
      </video>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ── Tarjeta glassmorphism ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
        style={{
          background: 'rgba(8, 5, 15, 0.82)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '40px 32px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Brillo decorativo superior */}
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 200, height: 120, pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(244,63,94,0.2) 0%, transparent 70%)',
        }} />

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white text-4xl mb-2 w-full text-center"
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          INICIAR SESIÓN
        </motion.h2>

        <p className="text-center mb-8 w-full"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', color: '#A3A3C2' }}>
          Accede a tu cuenta en AURA
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <label className="block mb-2" style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px',
              fontWeight: 600, color: '#A3A3C2', textTransform: 'uppercase', letterSpacing: '0.4px'
            }}>
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              disabled={loading}
              className="w-full px-5 py-4 text-white transition-all duration-300 focus:outline-none"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px',
                background: 'rgba(15, 12, 26, 0.6)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#F43F5E';
                e.target.style.boxShadow = '0 0 12px rgba(244, 63, 94, 0.4)';
                e.target.style.background = 'rgba(15, 12, 26, 0.8)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                e.target.style.boxShadow = 'none';
                e.target.style.background = 'rgba(15, 12, 26, 0.6)';
              }}
            />
          </motion.div>

          {/* Contraseña */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <label className="block mb-2" style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px',
              fontWeight: 600, color: '#A3A3C2', textTransform: 'uppercase', letterSpacing: '0.4px'
            }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                disabled={loading}
                className="w-full px-5 py-4 text-white transition-all duration-300 focus:outline-none"
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px',
                  paddingRight: '3rem',
                  background: 'rgba(15, 12, 26, 0.6)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '10px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#F43F5E';
                  e.target.style.boxShadow = '0 0 12px rgba(244, 63, 94, 0.4)';
                  e.target.style.background = 'rgba(15, 12, 26, 0.8)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'rgba(15, 12, 26, 0.6)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: 0,
                }}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </motion.div>

          {/* Mensaje éxito / error */}
          {mensaje && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 rounded-lg text-center"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px',
                background: isSuccess ? 'rgba(34, 197, 94, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                border: isSuccess ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(244, 63, 94, 0.4)',
                color: '#FFFFFF',
              }}
            >
              {mensaje}
            </motion.div>
          )}

          {/* Botón Iniciar sesión */}
          <motion.button
            type="submit"
            disabled={loading}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-lg transition-all duration-300"
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '16px', fontWeight: 600,
              background: loading ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.95)',
              color: '#0F0C1A', border: 'none',
              boxShadow: '0 4px 15px rgba(255,255,255,0.1)', cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Verificando...' : 'Iniciar sesión'}
          </motion.button>

          {/* Botón Volver */}
          <motion.button
            type="button"
            onClick={onVolver}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}
            className="w-full py-3 rounded-lg transition-all duration-300"
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', fontWeight: 400,
              background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
              color: '#A3A3C2', cursor: 'pointer',
            }}
          >
            ← Volver al inicio
          </motion.button>
        </form>

        {/* Línea decorativa inferior */}
        <div style={{
          position: 'absolute', bottom: 0, left: '10%', width: '80%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(244,63,94,0.4), rgba(168,85,247,0.4), transparent)',
        }} />
      </motion.div>
    </div>
  );
}

// Export por defecto para compatibilidad con tu App.tsx actual
export default function Login() {
  return <LoginForm onVolver={() => window.history.back()} />;
}
