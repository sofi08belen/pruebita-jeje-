import { useState } from "react";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({ nombre: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getStrength(val: string): number {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  }

  const strength = getStrength(password);
  const strengthLabels = ["", "Débil", "Regular", "Buena", "Fuerte"];
  const strengthClass = strength <= 1 ? "weak" : strength === 2 ? "medium" : "strong";

  function validate() {
    const newErrors = { nombre: "", email: "", password: "" };
    if (!nombre.trim()) newErrors.nombre = "Por favor ingresa tu nombre.";
    if (!emailRegex.test(email)) newErrors.email = "Ingresa un correo válido.";
    if (password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    setErrors(newErrors);
    return !newErrors.nombre && !newErrors.email && !newErrors.password;
  }

  function handleSubmit() {
    if (validate()) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div style={styles.wrap}>
        <p style={styles.title}>¡Bienvenido, {nombre}! 🎉</p>
        <p style={styles.sub}>Tu cuenta fue creada correctamente.</p>
      </div>
    );
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.logo}>👤</div>
      <h1 style={styles.title}>Crear cuenta</h1>
      <p style={styles.sub}>Completa los datos para registrarte</p>

      {/* Nombre */}
      <div style={styles.field}>
        <label style={styles.label} htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          type="text"
          placeholder="Ej: María López"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ ...styles.input, ...(errors.nombre ? styles.inputError : {}) }}
          autoComplete="name"
        />
        {errors.nombre && <p style={styles.error}>{errors.nombre}</p>}
      </div>

      {/* Correo */}
      <div style={styles.field}>
        <label style={styles.label} htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          placeholder="nombre@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
          autoComplete="email"
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}
      </div>

      {/* Contraseña */}
      <div style={styles.field}>
        <label style={styles.label} htmlFor="password">Contraseña</label>
        <div style={styles.inputWrap}>
          <input
            id="password"
            type={showPass ? "text" : "password"}
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              ...styles.input,
              paddingRight: "2.5rem",
              ...(errors.password ? styles.inputError : {}),
            }}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={styles.toggleBtn}
            aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>

        {password.length > 0 && (
          <>
            <div style={styles.strengthBar}>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  style={{
                    ...styles.strengthSegment,
                    background: i < strength
                      ? strengthClass === "weak" ? "#ef4444"
                        : strengthClass === "medium" ? "#f59e0b"
                        : "#10b981"
                      : "#e5e7eb",
                  }}
                />
              ))}
            </div>
            <p style={styles.strengthLabel}>{strengthLabels[strength]}</p>
          </>
        )}
        {errors.password && <p style={styles.error}>{errors.password}</p>}
      </div>

      <button onClick={handleSubmit} style={styles.submitBtn}>
        Crear cuenta
      </button>

      <p style={styles.loginLink}>
        ¿Ya tienes cuenta?{" "}
        <a href="/login" style={styles.link}>Inicia sesión aquí</a>
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    maxWidth: 420,
    width: "100%",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "2rem",
    margin: "2rem auto",
    fontFamily: "sans-serif",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.25rem",
    fontSize: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 600,
    color: "#111827",
    marginBottom: "0.25rem",
  },
  sub: {
    textAlign: "center",
    fontSize: 13,
    color: "#6b7280",
    marginBottom: "1.75rem",
  },
  field: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "0.55rem 0.75rem",
    fontSize: 14,
    border: "1px solid #d1d5db",
    borderRadius: 8,
    outline: "none",
    background: "#fff",
    color: "#111827",
    boxSizing: "border-box",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  toggleBtn: {
    position: "absolute",
    right: 10,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    padding: 0,
  },
  strengthBar: {
    display: "flex",
    gap: 4,
    marginTop: 6,
  },
  strengthSegment: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    transition: "background 0.3s",
  },
  strengthLabel: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 4,
  },
  error: {
    fontSize: 11,
    color: "#ef4444",
    marginTop: 4,
  },
  submitBtn: {
    width: "100%",
    marginTop: "1.5rem",
    padding: "0.65rem 1rem",
    fontSize: 15,
    fontWeight: 500,
    background: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  loginLink: {
    textAlign: "center",
    fontSize: 13,
    color: "#6b7280",
    marginTop: "1.25rem",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
  },
};