const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || "";
  if (!token) {
    return res
      .status(401)
      .send("User not logged in.");
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decrypt) => {
      req.user = {
        id: decrypt.id,
        name: decrypt.name,
      };
      next();
    });
  } catch (err) {
    return res.status(500).send(err.toString());
  }
};

module.exports = verifyToken;