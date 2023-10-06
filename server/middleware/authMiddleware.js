const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //   get token from header
    const token = req.header("authorization").split(" ")[1];
    const bcryptedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = bcryptedToken.userId;
    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
