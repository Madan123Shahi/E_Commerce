export const isAdmin = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Not Authorized" });
  }
  if (req.user.role === "admin") {
    return next();
  }
  res
    .status(403)
    .json({
      message: "Forbiddon:Admin Access required",
      userRole: req.user.role,
    });
};
