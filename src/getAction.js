const { find, contains } = require('@laufire/utils/collection');
const rules = require('./rules');

const getAction = (context) => {
	const { data } = context;

	const { action } = find(rules, ({ action, ...rule }) =>
		contains(data, rule));

	return action;
};

module.exports = getAction;
