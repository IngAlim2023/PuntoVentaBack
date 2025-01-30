import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  jwt.verify(token, process.env.JWT_PRIVATE, (err, user) => {
    if (err) return res.status(403).json({ message: "Dato invalido" });
    req.user = user;
    next();
  });
};
