import jwt from "jsonwebtoken";
import config from "../DB/ConfigDB.js";

export const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Formato de token inválido" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new Error("Token expirado"));
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido" });
    }

    return res.status(500).json({ message: "Error al verificar el token" });
  }
};


export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {

    if (!req.user || !req.user.role) {
      return res.status(403).json({
        message: "No se pudo verificar el rol del usuario"
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "No tienes permisos para acceder a este recurso"
      });
    }

    next();
  };
};