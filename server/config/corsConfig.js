const cors = require('cors');
const { constants } = require('./constantsConfig');

const corsOptions = {
  origin: [...constants.ORIGIN.URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

module.exports = cors(corsOptions);
