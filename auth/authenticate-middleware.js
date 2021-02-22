/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

const roles = ["normal", "admin"];

function restrict(role) {
  return async (req, res, next) => {
    const authErr = {
      message: "Invalid Credentials",
    };

    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json(authErr);
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json(authErr);
        }

        if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
          return res.status(401).json(authErr);
        }
      });

      next();
    } catch (err) {
      next(err);
    }
  };
}
module.exports = restrict;
