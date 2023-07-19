const { createProxyMiddleware } = require('http-proxy-middleware');

const express = require('express');
const cors = require('cors');

const app = express();

// Cấu hình CORS
app.use(cors());



module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://172.31.0.64:10077',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/event/get-cameras',
    createProxyMiddleware({
      target: 'http://172.31.0.64:10077',
      changeOrigin: true,
    })
  );
};
