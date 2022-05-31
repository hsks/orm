const { map } = require('@laufire/utils/collection');
const buildEntity = require('./buildEntity');

const parser = (context) => {
	const { source: entities, config } = context;

	map(entities, (data, name) =>
		buildEntity({
			...context,
			data: {
				config: config.children[name],
				entityData: data,
				entityName: name,
			},
		}));
};

module.exports = parser;
