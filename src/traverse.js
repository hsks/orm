const { asyncMap } = require('./helpers');
const typeProcessors = require('./typeProcessors');

const traverse = (context) => {
	const { source, config: { children }} = context;

	return asyncMap(source, (entityData, entityName) => {
		const entityConfig = children[entityName];
		const { type } = entityConfig;

		return typeProcessors[type]({
			...context,
			data: {
				entityName,
				entityData,
				entityConfig,
			},
		});
	});
};

module.exports = traverse;
