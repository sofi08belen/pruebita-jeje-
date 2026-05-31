import { motion } from 'motion/react';
import { useState } from 'react';
import videoBackground from "../imports/Modern_Kids_Craft_Ideas_to_Refresh_Your_Routine_-_Pin-482940760053419111.mp4";

interface RegistroFormProps {
  onVolver: () => void;
}

export function RegistroForm({ onVolver }: RegistroFormProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function getStrength(val: string): number {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  }
  const strength = getStrength(password);
  const strengthLabels = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'];
  const strengthColors = ['', '#f43f5e', '#f59e0b', '#a855f7', '#10b981'];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensaje('');
    if (!nombre || !email || !password) {
      setMensaje('Todos los campos son obligatorios');
      setIsSuccess(false);
      return;
    }
    if (password.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres');
      setIsSuccess(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMensaje(response.status === 409 ? 'Este correo ya está registrado' : data.error || 'Error al crear la cuenta');
        setIsSuccess(false);
        return;
      }
      setMensaje(`¡Registro exitoso! Bienvenido, ${nombre} 🎉`);
      setIsSuccess(true);
      setNombre(''); setEmail(''); setPassword('');
      setTimeout(() => onVolver(), 2000);
    } catch {
      setMensaje('No se pudo conectar con el servidor. ¿Está corriendo el backend?');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="size-full relative overflow-hidden flex items-center justify-center">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={videoBackground} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
        style={{
          background: 'rgba(8, 5, 15, 0.82)', backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px', padding: '40px 32px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 200, height: 120, pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.2) 0%, transparent 70%)',
        }} />

        <motion.h2
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-white text-4xl mb-2 w-full text-center"
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          REGISTRO
        </motion.h2>
        <p className="text-center mb-8 w-full"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', color: '#A3A3C2' }}>
          Crea tu cuenta y comienza tu camino
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <label className="block mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#A3A3C2', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Nombre de usuario</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ingresa tu nombre" disabled={loading}
              className="w-full px-5 py-4 text-white transition-all duration-300 focus:outline-none"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', background: 'rgba(15,12,26,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
              onFocus={(e) => { e.target.style.borderColor = '#A855F7'; e.target.style.boxShadow = '0 0 12px rgba(168,85,247,0.4)'; e.target.style.background = 'rgba(15,12,26,0.8)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; e.target.style.background = 'rgba(15,12,26,0.6)'; }}
            />
          </motion.div>

          {/* Email */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <label className="block mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#A3A3C2', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Correo electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" disabled={loading}
              className="w-full px-5 py-4 text-white transition-all duration-300 focus:outline-none"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', background: 'rgba(15,12,26,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
              onFocus={(e) => { e.target.style.borderColor = '#A855F7'; e.target.style.boxShadow = '0 0 12px rgba(168,85,247,0.4)'; e.target.style.background = 'rgba(15,12,26,0.8)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; e.target.style.background = 'rgba(15,12,26,0.6)'; }}
            />
          </motion.div>

          {/* Contraseña */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <label className="block mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#A3A3C2', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" disabled={loading}
                className="w-full px-5 py-4 text-white transition-all duration-300 focus:outline-none"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', paddingRight: '3rem', background: 'rgba(15,12,26,0.6)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                onFocus={(e) => { e.target.style.borderColor = '#A855F7'; e.target.style.boxShadow = '0 0 12px rgba(168,85,247,0.4)'; e.target.style.background = 'rgba(15,12,26,0.8)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.boxShadow = 'none'; e.target.style.background = 'rgba(15,12,26,0.6)'; }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: 0 }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
            {password.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0,1,2,3].map((i) => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < strength ? strengthColors[strength] : 'rgba(255,255,255,0.08)', transition: 'background 0.3s', boxShadow: i < strength ? `0 0 6px ${strengthColors[strength]}60` : 'none' }} />
                  ))}
                </div>
                <p style={{ fontSize: 11, color: strengthColors[strength], marginTop: 5, fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{strengthLabels[strength]}</p>
              </div>
            )}
          </motion.div>

          {mensaje && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 rounded-lg text-center"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', background: isSuccess ? 'rgba(34,197,94,0.15)' : 'rgba(244,63,94,0.15)', border: isSuccess ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(244,63,94,0.4)', color: '#FFFFFF' }}>
              {mensaje}
            </motion.div>
          )}

          <motion.button type="submit" disabled={loading}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(255,255,255,0.15)' }} whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-lg transition-all duration-300"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '16px', fontWeight: 600, background: loading ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.95)', color: '#0F0C1A', border: 'none', boxShadow: '0 4px 15px rgba(255,255,255,0.1)', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </motion.button>

          <motion.button type="button" onClick={onVolver}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            whileHover={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}
            className="w-full py-3 rounded-lg transition-all duration-300"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px', fontWeight: 400, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#A3A3C2', cursor: 'pointer' }}>
            ← Volver al inicio
          </motion.button>
        </form>

        <div style={{ position: 'absolute', bottom: 0, left: '10%', width: '80%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(244,63,94,0.4), transparent)' }} />
      </motion.div>
    </div>
  );
}

export default function Register() {
  return <RegistroForm onVolver={() => window.history.back()} />;
}
