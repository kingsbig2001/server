'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The express app we just created

// This will be our application entry. We'll setup our server here.
var port = parseInt(process.env.PORT, 10) || 4010;
_app2.default.set('port', port);

var server = _http2.default.createServer(_app2.default);
server.listen(port, function () {
    console.log('app started and listening to ' + port);
});

exports.default = server;