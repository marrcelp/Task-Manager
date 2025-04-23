const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('data.json');

// Konfiguracja CORS – najważniejsze!
server.use(cors({
  origin: 'https://marrcelp.github.io',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

server.use(jsonServer.defaults());
server.use(router);

server.listen(4000, () => {
  console.log('JSON Server is running on port 4000');
});
