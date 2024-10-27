const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).send({
        message: "Auth failed",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);
    if (!decoded) return res.status(401).json({ message: "Invalid token" });
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
