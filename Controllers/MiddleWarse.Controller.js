const jwt = require("jsonwebtoken");

const MiddleWarse = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
        if (error) {
          return res.json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.json("you are not authenticated!!");
    }
  },
  verifyTokenAdmin: (req, res, next) => {
    MiddleWarse.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        res.json("You are not allow continue");
      }
    });
  },
};
module.exports = MiddleWarse;
