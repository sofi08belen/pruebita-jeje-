const express = require("express");
const cors = require("cors");
const authRoutes = require("./authRoutes");

const app = express();
const PORT = 3001;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor AURA funcionando ✅" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor AURA corriendo en http://localhost:${PORT}`);
});