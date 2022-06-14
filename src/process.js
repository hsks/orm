const { map } = require('@laufire/utils/collection');
const { isDefined } = require('@laufire/utils/reflection');
const { statusKey, idKey } = require('./constants');
const getAction = require('./getAction');

// eslint-disable-next-line max-lines-per-function
const entity = (context) => {
	const {
		data: {
			entityData,
			config: currentConfig,
			parentStatus = 'sync',
		},
	} = context;
	const { [statusKey]: currentStatus } = entityData;
	const { children } = currentConfig;

	entityData[statusKey] = getAction({
		...context,
		data: {
			parentStatus: parentStatus,
			currentStatus: currentStatus,
			idExists: isDefined(entityData[idKey]),
		},
	});

	map(children, (config, name) => {
		const { type } = config;

		// eslint-disable-next-line no-use-before-define
		typeProcessors[type]({
			...context,
			data: {
				entityData: entityData[name],
				entityName: name,
				config: config,
				parentStatus: currentStatus,
			},
		});
	});
};

const collection = (context) => {
	const { data: { entityName, entityData, config, parentStatus }} = context;

	map(entityData, (data) =>
		entity({
			...context,
			data: {
				entityName: entityName,
				entityData: data,
				config: config,
				parentStatus: parentStatus,
			},
		}));
};

const typeProcessors = {
	entity,
	collection,
};

const process = (context) => {
	const { source, config: { children }} = context;

	map(source, (entityData, entityName) => {
		const entityConfig = children[entityName];
		const { type } = entityConfig;

		return typeProcessors[type]({
			...context,
			data: {
				entityData: entityData,
				entityName: entityName,
				config: entityConfig,
			},
		});
	});
};

module.exports = process;
