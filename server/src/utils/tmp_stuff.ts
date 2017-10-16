
//----------------------------------------------------------

// GET USER PROFILE BY JWT TOKEN FROM AUTH0

const request = require('request');

module.exports = function(idToken, callback) {
    request({
        url: 'https://zemarx.eu.auth0.com/tokeninfo',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        json: {
            id_token: idToken
        }
    }, callback);
};

//----------------------------------------------------------


// LOGGER USE: import logger from ...
// logger.info('text');
// logger.debug('text');

let winston = require('winston');

let tsFormat = () => (new Date()).toLocaleTimeString();

let logger = new (winston.Logger)({
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
        })
    ]
});

logger.level = 'debug';

module.exports = logger;


//----------------------------------------------------------

// PARSE JWT TOKEN 

module.exports = function(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
};

//----------------------------------------------------------
