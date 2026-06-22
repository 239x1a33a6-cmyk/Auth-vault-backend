function roleMiddleware(requiredRole) {
  return function (req, res, next) {
    if (requiredRole !== req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Forbidden, Access Denied!!",
      });
    }
    next();
  };
}
module.exports = {
  roleMiddleware,
};
