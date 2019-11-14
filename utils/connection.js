const mongoose = require('mongoose');
const utils = require('../utils/utils');
const RabbitMQ = require('./rabbitmq')
const subscriber = require('./rabbitmq')

const { addOrUpdateCache } = require('../controllers/user');
const { sendUserToken, sendUserSignupEmail } = require('../utils/emails');
const { sendMail } = require('../utils/utils');
require('dotenv').config();

// Socket config
module.exports = {
  mongo() {
    mongoose.promise = global.promise;
    mongoose
      .connect(utils.config.mongo, {
        keepAlive: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500
      })
      .then(() => {
        console.log('MongoDB is connected')
      })
      .catch((err) => {
        console.log(err)
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
        setTimeout(this.mongo, 5000)
      })
  },
  async rabbitmq() {
    RabbitMQ.init(utils.config.amqp_url);
  },
  async subscribe() {
    await subscriber.init(utils.config.amqp_url);
    // Add to redis cache
    subscriber.consume('ADD_OR_UPDATE_USER_STACKOVERFLOW_CACHE', (msg) => {
      const data = JSON.parse(msg.content.toString());
      addOrUpdateCache(data.newUser, 'stackoverflow__users')
      subscriber.acknowledgeMessage(msg);
    }, 3);

    // Send User Signup Mail
    subscriber.consume('SEND_USER_STACKOVERFLOW_SIGNUP_EMAIL', (msg) => {
      const data = JSON.parse(msg.content.toString());
      const userTokenMailBody = sendUserSignupEmail(data.user)
      const mailparams = {
        email: data.user.email,
        body: userTokenMailBody,
        subject: 'Activate your account'
      };
      sendMail(mailparams, (error, result) => {
        console.log(error)
        console.log(result)
      });
      subscriber.acknowledgeMessage(msg);
    }, 3);

    // Send User Token Mail
    subscriber.consume('SEND_USER_STACKOVERFLOW_TOKEN_EMAIL', (msg) => {
      const data = JSON.parse(msg.content.toString());
      const userTokenMailBody = sendUserToken(data.user, data.token)
      const mailparams = {
        email: data.user.email,
        body: userTokenMailBody,
        subject: 'Recover your password'
      };
      sendMail(mailparams, (error, result) => {
        console.log(error)
        console.log(result)
      });
      subscriber.acknowledgeMessage(msg);
    }, 3);

    // /**
    //  * Token Exchange
    //  */
    // // Limit Buy token
    // subscriber.consume('LIMIT_BUY', async (msg) => {
    //   const data = JSON.parse(msg.content.toString());
    //   const result = await TokenController.limitBuy(data.token, data.price, data.user, data.amount)
    //   // console.log(result)
    //   ioClient.emit('broadcast', { user: data.user, result })
    //   subscriber.acknowledgeMessage(msg);
    // }, 3);

    // // Market Buy token
    // subscriber.consume('MARKET_BUY', async (msg) => {
    //   const data = JSON.parse(msg.content.toString());
    //   const result = await TokenController.marketBuy(data.token, data.user, data.amount)
    //   // console.log(result)
    //   ioClient.emit('broadcast', { user: data.user, result })
    //   subscriber.acknowledgeMessage(msg);
    // }, 3);

    // // Limit Sell token
    // subscriber.consume('LIMIT_SELL', async (msg) => {
    //   const data = JSON.parse(msg.content.toString());
    //   const result = await TokenController.limitSell(data.token, data.price, data.user, data.amount)
    //   // console.log(result)
    //   ioClient.emit('broadcast', { user: data.user, result })
    //   subscriber.acknowledgeMessage(msg);
    // }, 3);

    // // Market Sell token
    // subscriber.consume('MARKET_SELL', async (msg) => {
    //   const data = JSON.parse(msg.content.toString());
    //   const result = await TokenController.marketSell(data.token, data.user, data.amount)
    //   // console.log(result)
    //   ioClient.emit('broadcast', { user: data.user, result })
    //   subscriber.acknowledgeMessage(msg);
    // }, 3);
  },
  // async socket() {
  //   server.on('connection', (socket) => {
  //     console.info(`Client connected [id=${socket.id}]`);

  //     // Broadcast to all connected sockets
  //     socket.on('broadcast', (message) => {
  //       server.emit('message', message)
  //     });
  //     // when socket disconnects, remove it from the list:
  //     socket.on('disconnect', () => {
  //       // sequenceNumberByClient.delete(socket);
  //       console.info(`Client gone [id=${socket.id}]`);
  //     });
  //   });
  // }
}
