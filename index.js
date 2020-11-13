'use strict'

require('dotenv').config();
const http = require('http');
const app = require('./app.js');
const io = require('./server/socket/_io.js');

//TODO CONFIG FROM ENV FILE
const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

async function bootstrap () {
    /**
   * Add external services init as async operations (db, redis, etc...)
   * e.g.
   * await sequelize.authenticate()
   */
  return http.createServer(app).listen(port);
}

bootstrap()
    .then(server => {
      io.attach(server);
      console.log(`Server listening at http://${hostname}:${server.address().port}`);
    })
    .catch(error => {
      setImmediate(() => {
        console.error( 'Server Error:');
        console.error(error);
        process.exit();
      });
    });

