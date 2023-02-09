const jwt = require('jsonwebtoken');

function encodeJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function decodeJWT(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid token');
  }
}

module.exports = { encodeJWT, decodeJWT };