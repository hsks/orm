const { sleep, peek } = require('@laufire/utils/debug');

const cb = async ({ entityName, action, data }) => {
	peek({ entityName, action, data });
	const duration = 2000;

	await sleep(duration);
	return data;
};

module.exports = cb;
