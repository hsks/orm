const { asyncMap } = require('./helpers');
const typeProcessors = require('./typeProcessors');

const traverse = (context) => {
	const { source, config: { children }} = context;

	asyncMap(source, (entityData, entityName) => {
		const entityConfig = children[entityName];
		const { type } = entityConfig;

		typeProcessors[type]({
			...context,
			data: {
				entityData,
				entityConfig,
			},
		});
	});
};

module.exports = traverse;
