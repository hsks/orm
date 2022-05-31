const parser = require('./parser');
const source = require('./structure');
const config = require('./config');

const cb = (context) => {
	const { data: { action, mapped }} = context;

	actions[action] && actions[action](mapped);
};

parser({ source, config, cb });
