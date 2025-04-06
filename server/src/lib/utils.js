import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("token not created");
    return res.status(401);
  }

  jwt.verify(token, process.env.JWTSECRET, (err, user) => {
    if (err) return res.status(401);
    req.user = user;
    next();
  });
}
export { authenticateToken };
