const jsonwebtoken = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

function auth(req, _res, next) {
  const token = req.cookies.jwt;
  console.log(req)

  console.log(token)
  // const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
  if (!token) {
    return next(new Unauthorized());
  }

  let payload;
  try {
    payload = jsonwebtoken.verify(token, 'some-secret-salt');
  } catch (err) {
    return next(new Unauthorized());
  }
  req.user = payload;

  return next();
}

module.exports = {
  auth,
};
