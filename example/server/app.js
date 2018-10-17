/**
 * Created by danstan on 8/1/17.
 */


const net = require('net');
const Iso_8583 = require('iso_8583');
const logger = require('../tools/logger');
const helpers = require('../tools/helpers');
const config = require('../config/env');

const server = net.createServer();

const configs = config[process.env.NODE_ENV];
const PORT = configs.port;
const HOST = '0.0.0.0';

server.on('connection', (socket) => {
  // New Client Connection
  socket.setTimeout(20000);
  logger.info({
    family: socket.remoteFamily,
    ip: socket.remoteAddress,
    port: socket.remotePort,
  }, '****** new client connection ******');

  const new_0800_0810_Initial = {
    0: '0800',
    7: '0818160244',
    11: '646465',
    12: '160244',
    13: '0818',
    70: '001',
  };
  helpers.attachDiTimeStamps(new_0800_0810_Initial);
  socket.write(new Iso_8583(new_0800_0810_Initial).getBufferMessage(), 'utf8', () => {
    logger.info('Message write finish');
  });

  socket.on('data', (data) => {
    // this is the data that came to postilion
    // postilion responds with a bitmap format
    const thisMti = data.slice(2, 6).toString();
    const iso = new Iso_8583().getIsoJSON(data);
    switch (thisMti) {
      // auth request message
      case '0810':
        if (iso['70'] === '001') {
          const new_0800_0810 = {
            0: '0810',
            39: '00',
            70: '301',
          };
          helpers.attachDiTimeStamps(new_0800_0810);
          socket.write(new Iso_8583(new_0800_0810).getBufferMessage(), 'utf8', () => {
            logger.info('Message write finish');
          });
        } else {
          logger.info('**** connection with client up ****');
        }
        break;
      case '0500':
      case '0501':
        break;
      default:
        const new_mess = iso;
        iso[0] = `${iso[0].slice(0, 2)}10`;
        new_mess[39] = '00';
        helpers.attachDiTimeStamps(new_mess);
        socket.write(new Iso_8583(new_mess).getBufferMessage());
    }
  });
  socket.on('error', (err) => {
    logger.info({ error: `error in connection ${err}` });
    socket.destroy(JSON.stringify({
      error: 'connection error',
      code: 500,
    }));
    socket.end();
  });

  socket.on('timeout', () => {
    const new_0800_0810 = {
      0: '0800',
      7: '0818160244',
      11: '646465',
      12: '160244',
      13: '0818',
      70: '001',
    };
    helpers.attachDiTimeStamps(new_0800_0810);
    socket.write(new Iso_8583(new_0800_0810).getBufferMessage(), 'utf8', () => {
      logger.info('Message write finish');
    });
  });

  // listen for the end event
  socket.on('end', () => {
    logger.info('Transaction finished');
  });
  // listen for the close event
  socket.on('close', (err) => {
    if (!err) {
      logger.info({
        ok: 'success',
      }, 'connection was closed');
    } else {
      logger.info({
        error: err,
      }, 'connection was closed');
    }
  });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  server.listen({
    host: HOST,
    port: PORT,
    exclusive: true,
  });
}

// server running
server.on('listening', () => {
  logger.info('server is listening on %j', PORT);
});

// Restart server if port or address is under use
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    logger.info('Address or Port in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen({
        host: HOST,
        port: PORT,
        exclusive: true,
      });
    }, 5000);
  } else {
    logger.info({ err: `Server error ${err}` });
  }
});

module.exports = server;
