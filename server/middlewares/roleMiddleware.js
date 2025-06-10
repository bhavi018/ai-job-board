// roleMiddleware.js
// module.exports = function(role) {
//   return function(req, res, next) {
//     if (req.user.role !== role) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }
//     next();
//   };
// };



// const roleMiddleware = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied: insufficient permissions" });
//     }
//     next();
//   };
// };

// module.exports = roleMiddleware;


const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = roleMiddleware;  // ✅ default export


// roleMiddleware.js

// const restrictTo = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user || !allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Access denied: insufficient permissions' });
//     }
//     next();
//   };
// };

// module.exports = { restrictTo }; // ✅ named export

