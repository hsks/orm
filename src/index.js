const parser = require('./parser');
const source = require('./structure');
const config = require('./config');
const cb = require('./cb');

parser({ source, config, cb });
