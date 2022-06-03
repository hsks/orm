const { find, contains } = require('@laufire/utils/collection');
const rules = require('./rules');

const getAction = (context) => {
	const { data } = context;

	return find(rules, ({ action, ...rule }) =>
		contains(data, rule))?.action;
};

module.exports = getAction;
