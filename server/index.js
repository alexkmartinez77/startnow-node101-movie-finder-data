const server = require('./app').default;

server.listen(3000, function() {
  console.log('Server is listening on http://localhost:3000');
});
