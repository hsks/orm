const { map } = require('@laufire/utils/collection');
const process = require('./process');
const traverse = require('./traverse');

const parser = (context) => {
	const { source: entities, config } = context;

	map(entities, (data, name) =>
		process({
			...context,
			data: {
				config: config.children[name],
				entityData: data,
				entityName: name,
			},
		}));

	return traverse(context);
};

module.exports = parser;
