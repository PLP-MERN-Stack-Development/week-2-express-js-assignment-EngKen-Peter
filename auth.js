const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token === 'Bearer mysecrettoken') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = auth;
