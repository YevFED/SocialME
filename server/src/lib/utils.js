import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("token not created");
    return res.status(401);
  }

  jwt.verify(token, process.env.JWTSECRET, async (err, user) => {
    if (err) return res.status(401);
    const dbUser = await User.findOne({ _id: user.user._id });

    if (!dbUser) {
      return res.status(401);
    }

    req.user = dbUser;
    next();
  });
}
export { authenticateToken };
