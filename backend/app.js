const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
// const cors = require('cors');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const { auth } = require('./midllewars/auth');
const { errorHandler } = require('./midllewars/errorHandler');
const { requestLogger, errorLogger } = require('./midllewars/logger');

const app = express();
app.use(express.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');
const { PORT = 3000 } = process.env;
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3001',
  'http://localhost:3001',
  'https://domainname.chisvin.nomoredomains.xyz',
  'http://domainname.chisvin.nomoredomains.xyz',
  'https://api.domainname.chisvin.nomoredomains.xyz',
  'https://api.domainname.chisvin.nomoredomains.xyz',
];
console.log('ghsjkd');
// app.use(cors());
app.use((req, res, next) => {
  const { origin } = req.headers;
  console.log(origin);
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
  return null;
});
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);
app.get('/signout', (_req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
app.use('/users', require('./routers/users'));
app.use('/', require('./routers/cards'));

app.all('*', (_req, _res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT);
