const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

// const authorizePermissions = async (req, res, next) => {
//   if (req.user.role != "admin") {
//     throw new CustomError.UnauthorizedError("Unauthorized access to the route");
//   }
//   console.log("admin route");
//   next();
// };
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized access to the route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
