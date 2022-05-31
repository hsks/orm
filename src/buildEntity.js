const { map, result } = require('@laufire/utils/collection');
const { resolve } = require('@laufire/utils/path');
const { isDefined } = require('@laufire/utils/reflection');
const getAction = require('./getAction');

// eslint-disable-next-line max-lines-per-function
const entity = (context) => {
	const {
		source,
		config,
		data: {
			entityData,
			entityName,
			config: currentConfig,
			parentStatus = 'sync',
		},
	} = context;
	const { statusKey } = config;
	const { [statusKey]: currentStatus, id } = entityData;
	const { children } = currentConfig;

	const action = getAction({
		...context,
		data: {
			parentStatus: parentStatus,
			currentStatus: currentStatus,
			idExists: isDefined(id),
		},
	});

	entityData[statusKey] = action;

	map(children, ({ path }, name) => process({
		...context,
		data: {
			entityData: result(source[entityName], path),
			entityName: name,
			config: result(currentConfig, resolve(`children/${ path }`)),
			parentStatus: entityData[statusKey],
		},
	}));
};

// eslint-disable-next-line max-lines-per-function
const collection = (context) => {
	const { config: { statusKey }} = context;
	const { data: { parentStatus, entityData, config }} = context;
	const { children } = config;

	// eslint-disable-next-line max-lines-per-function
	map(entityData, (entity) => {
		const { [statusKey]: currentStatus, id } = entity;

		const action = getAction({
			...context,
			data: {
				parentStatus: parentStatus,
				currentStatus: currentStatus,
				idExists: isDefined(id),
			},
		});

		entity[statusKey] = action;

		map(children, (data, name) => process({
			...context,
			data: {
				config: config.children[name],
				entityData: entity[name],
				entityName: name,
				parentStatus: entity[statusKey],
			},
		}));
	});
};

const process = (context) => {
	const { data: { config: { type }}} = context;
	const typeProcessors = {
		entity,
		collection,
	};

	typeProcessors[type](context);
};

module.exports = process;
