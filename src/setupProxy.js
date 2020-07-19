const proxy = require('http-proxy-middleware');
require('dotenv').config();

module.exports = function (app) {
  const URL = process.env.API_URL;
  app.use(proxy('/api', { target: URL }));
};
