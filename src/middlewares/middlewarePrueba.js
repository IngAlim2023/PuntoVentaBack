// Prueba para rutas protegidas:
export const getSesion = async (req, res, next) => {
  const sesion = req.session;
  
  if (sesion.user === null) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  next();
};
