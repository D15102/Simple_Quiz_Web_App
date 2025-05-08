/**
 * Entry point for Render deployment
 * This file replicates the functionality in bin/www
 */

var app = require('./app');
var debug = require('debug')('quiz:server');
var http = require('http');
var mongoose = require('mongoose');

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Wait for MongoDB connection to be established before starting the server
 * This ensures that the application doesn't start handling requests before
 * the database connection is ready.
 */
mongoose.connection.once('connected', () => {
  console.log('MongoDB connection established - starting server');

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

// If the connection throws an error after initial connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error after initial connection:', err);
});

// Add a fallback to start the server even if MongoDB connection fails
// This ensures the application starts even if there are database issues
setTimeout(() => {
  if (server.listening === false) {
    console.warn('MongoDB connection timed out after 30 seconds. Starting server anyway...');
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  }
}, 30000); // 30 second timeout

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
