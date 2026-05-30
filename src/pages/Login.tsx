import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loginResult, setLoginResult] = useState<null | {
    mensaje: string;
    primerAcceso: boolean;
    usuario: { nombre: string; email: string };
  }>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate() {
    const newErrors = { email: "", password: "" };
    if (!emailRegex.test(email)) newErrors.email = "Ingresa un correo válido.";
    if (password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  }

  async function handleSubmit() {
    setServerError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setServerError(data.error || "Error al iniciar sesión.");
        return;
      }
      setLoginResult(data);
    } catch (err) {
      setServerError("No se pudo conectar con el servidor. ¿Está corriendo el backend?");
    } finally {
      setLoading(false);
    }
  }

  if (loginResult) {
    return (
      <div style={styles.wrap}>
        <div style={styles.logo}>{loginResult.primerAcceso ? "🎉" : "👋"}</div>
        <p style={styles.title}>{loginResult.mensaje}</p>
        <p style={styles.sub}>
          Hola, <strong>{loginResult.usuario.nombre}</strong>. Sesión iniciada correctamente.
        </p>
        {loginResult.primerAcceso && (
          <p style={{ ...styles.sub, color: "#3b82f6" }}>
            ¡Es tu primera vez en AURA, bienvenido!
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.logo}>🔐</div>
      <h1 style={styles.title}>Iniciar sesión</h1>
      <p style={styles.sub}>Ingresa tus datos para continuar</p>

      {serverError && <div style={styles.serverError}>⚠️ {serverError}</div>}

      <div style={styles.field}>
        <label style={styles.label} htmlFor="login-email">Correo electrónico</label>
        <input id="login-email" type="email" placeholder="nombre@ejemplo.com" value={email}
          onChange={(e) => setEmail(e.target.value)} disabled={loading}
          style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }} autoComplete="email" />
        {errors.email && <p style={styles.error}>{errors.email}</p>}
      </div>

      <div style={styles.field}>
        <label style={styles.label} htmlFor="login-password">Contraseña</label>
        <div style={styles.inputWrap}>
          <input id="login-password" type={showPass ? "text" : "password"} placeholder="Tu contraseña"
            value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}
            style={{ ...styles.input, paddingRight: "2.5rem", ...(errors.password ? styles.inputError : {}) }}
            autoComplete="current-password" />
          <button type="button" onClick={() => setShowPass(!showPass)} style={styles.toggleBtn}>
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.password && <p style={styles.error}>{errors.password}</p>}
      </div>

      <button onClick={handleSubmit} style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
        {loading ? "Verificando..." : "Iniciar sesión"}
      </button>

      <p style={styles.loginLink}>¿No tienes cuenta? <a href="#" style={styles.link}>Regístrate aquí</a></p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { maxWidth: 420, width: "100%", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "2rem", margin: "2rem auto", fontFamily: "sans-serif" },
  logo: { width: 40, height: 40, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", fontSize: 20 },
  title: { textAlign: "center", fontSize: 20, fontWeight: 600, color: "#111827", marginBottom: "0.25rem" },
  sub: { textAlign: "center", fontSize: 13, color: "#6b7280", marginBottom: "1.75rem" },
  field: { marginBottom: "1rem" },
  label: { display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 },
  input: { width: "100%", padding: "0.55rem 0.75rem", fontSize: 14, border: "1px solid #d1d5db", borderRadius: 8, outline: "none", background: "#fff", color: "#111827", boxSizing: "border-box" },
  inputError: { borderColor: "#ef4444" },
  inputWrap: { position: "relative", display: "flex", alignItems: "center" },
  toggleBtn: { position: "absolute", right: 10, background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 0 },
  error: { fontSize: 11, color: "#ef4444", marginTop: 4 },
  serverError: { background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "0.6rem 0.85rem", fontSize: 13, color: "#b91c1c", marginBottom: "1rem" },
  submitBtn: { width: "100%", marginTop: "1.5rem", padding: "0.65rem 1rem", fontSize: 15, fontWeight: 500, background: "#3b82f6", color: "#ffffff", border: "none", borderRadius: 8, cursor: "pointer" },
  loginLink: { textAlign: "center", fontSize: 13, color: "#6b7280", marginTop: "1.25rem" },
  link: { color: "#3b82f6", textDecoration: "none" },
};