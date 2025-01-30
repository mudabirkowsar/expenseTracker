const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  
    if (!token) {
      return res.status(401).json({ message: "Access token is missing." });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET); // Verify token
      req.user = decoded; // Attach user data to the request
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
  };
  