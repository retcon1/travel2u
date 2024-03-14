import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token = req.headers["access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorised" });

    req.userId = decoded.indexOf;
    next();
  });
};

export default verifyToken;
