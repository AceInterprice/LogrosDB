import express from "express"; 
import cors from "cors"; 
import config from "./DB/ConfigDB.js"; 
import authRouter from "./Routers/auth.Route.js";
import userRouter from "./Routers/Usuarios.Route.js"; 
import {pool} from "./DB/ConexionDB.js"; 

const app = express(); 

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("REQUEST RECIBIDO:", req.method, req.url);
  next();
});

// Rutas
app.use("/api/auth", authRouter);
app.use("/api", userRouter);

// Ruta de prueba
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      server: "ok",
      database: "connected"
    });

  } catch (error) {
    res.status(503).json({
      server: "ok",
      database: "disconnected",
      error: error.message
    });
  }
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    error: true,
    message: err.message || "Error interno del servidor"
  });
});

// Iniciar servidor
app.listen(config.port, config.host, () => {
  console.log(
    `✓ Servidor ejecutándose en http://${config.host}:${config.port}`,
  );
});

