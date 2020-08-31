const { verify } = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const logger = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({error: 'Token is missing'});
  }

  const [, token] = authHeader.split(' ');
  
  try {
    const decode = verify(token, authConfig.jwt.secret);

    const { sub } = decode;

    req.auth = {
      id: sub,
    }
  } catch (err) {
    return res.json({error: 'Invalid Token'});
  }

  return next();
};

module.exports = logger;