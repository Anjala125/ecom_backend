import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: 'No token'
      });
    }

    const actualToken = token.startsWith('Bearer ')
      ? token.split(' ')[1]
      : token;

    const decoded = jwt.verify(
      actualToken,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid Token'
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'User not authenticated'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access Denied'
      });
    }

    next();
  };
};

export { protect, authorizeRoles };