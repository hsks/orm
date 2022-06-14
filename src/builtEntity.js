const { asyncMap } = require('./helpers');

const typeProcessors = {
	entity: (context) => {
		const { data: { entityConfig, entityData }, cb } = context;
		const { children } = entityConfig;

		return asyncMap(children, async ({ type }, name) => {
			const data = await cb({
				...context,
				action: 'read',
				entityName: name,
			});

			entityData[name] = data;

			return typeProcessors[type]({
				...context,
				data: {
					entityConfig: children[name],
					entityName: name,
					entityData: data,
				},
			});
		});
	},

	collection: (context) => {
		const { data: { entityData, entityConfig, entityName }} = context;

		return asyncMap(entityData, (entity) =>
			typeProcessors.entity({
				...context,
				data: {
					entityName: entityName,
					entityData: entity,
					entityConfig: entityConfig,
				},
			}));
	},
};

const fetchTrial = (context) => {
	const { source, config } = context;

	return asyncMap(source, (entityData, entityName) => {
		const entityConfig = config[entityName];
		const { type } = entityConfig;

		return typeProcessors[type]({ ...context,
			data: {
				entityName,
				entityData,
				entityConfig,
			}});
	});
};

module.exports = fetchTrial;
