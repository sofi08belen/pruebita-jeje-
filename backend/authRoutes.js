const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("./db");

router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password)
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  if (password.length < 8)
    return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres." });
  try {
    const contrasena_hash = await bcrypt.hash(password, 10);
    await pool.query("CALL registrar_usuario(?, ?, ?, @p_resultado, @p_usuario_id)", [nombre, email, contrasena_hash]);
    const [[output]] = await pool.query("SELECT @p_resultado AS resultado, @p_usuario_id AS usuario_id");
    if (output.resultado === "EMAIL_YA_EXISTE")
      return res.status(409).json({ error: "Ya existe una cuenta con ese correo." });
    return res.status(201).json({ mensaje: "Cuenta creada exitosamente.", usuario_id: output.usuario_id });
  } catch (err) {
    console.error("Error en /register:", err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email y contraseña son requeridos." });
  try {
    const [[usuario]] = await pool.query(
      "SELECT id, nombre, email, contrasena_hash, estado FROM usuarios WHERE email = ?", [email]
    );
    if (!usuario) {
      await pool.query("INSERT INTO intentos_login (email_intentado, ip_address, exitoso) VALUES (?, ?, FALSE)", [email, req.ip]);
      return res.status(401).json({ error: "Email o contraseña incorrectos." });
    }
    if (usuario.estado !== "activo")
      return res.status(403).json({ error: "Tu cuenta está suspendida o inactiva." });
    const passwordValida = await bcrypt.compare(password, usuario.contrasena_hash);
    if (!passwordValida) {
      await pool.query("INSERT INTO intentos_login (email_intentado, ip_address, exitoso) VALUES (?, ?, FALSE)", [email, req.ip]);
      return res.status(401).json({ error: "Email o contraseña incorrectos." });
    }
    await pool.query("CALL iniciar_sesion(?, ?, ?, @p_resultado, @p_usuario_id, @p_nombre)", [email, req.ip, req.headers["user-agent"] || ""]);
    const [[loginOutput]] = await pool.query("SELECT @p_resultado AS resultado, @p_usuario_id AS usuario_id, @p_nombre AS nombre");
    const esPrimerAcceso = loginOutput.resultado === "PRIMER_ACCESO";
    return res.status(200).json({
      mensaje: esPrimerAcceso ? "¡Bienvenido a AURA por primera vez!" : "¡Bienvenido de vuelta!",
      primerAcceso: esPrimerAcceso,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
    });
  } catch (err) {
    console.error("Error en /login:", err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

module.exports = router;
