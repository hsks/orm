const parser = require('./parser');
const config = require('./config');
const cb = require('./cb');
const { idKey, statusKey } = require('./constants');

parser({
	source: {
		customer: {
			[idKey]: '',
			[statusKey]: 'fetch',
		},
	},
	config: config,
	cb: cb,
});
