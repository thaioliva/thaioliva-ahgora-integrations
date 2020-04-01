const config = require('./webpack.config.shared');
module.exports = config('/dev/', 'https://localhost:8010/api/');
