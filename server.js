const http = require('http');

//import app from app.js
const app = require('./app');

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, '0.0.0.0', () => {
    console.log('Server running at port :'+ port);
});

