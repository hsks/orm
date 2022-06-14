const { translate, flip, merge } = require('@laufire/utils/collection');
const { isDefined } = require('@laufire/utils/reflection');
const { asyncMap } = require('./helpers');
const getAction = require('./getAction');
const { statusKey, idKey } = require('./constants');

// eslint-disable-next-line max-lines-per-function
const processChildren = (context) => {
	const { data: { entityConfig: { children }}, cb } = context;
	const { data: { entityData, parentStatus }} = context;

	return asyncMap(children, async (childConfig, name) => {
		const { type } = childConfig;

		entityData[name] = entityData[name] || await cb({
			...context,
			action: 'read',
			entityName: name,
		});

		// eslint-disable-next-line no-use-before-define
		return typeProcessors[type]({
			...context,
			data: {
				entityName: name,
				entityData: entityData[name],
				entityConfig: childConfig,
				parentStatus: parentStatus,
			},
		});
	});
};

// eslint-disable-next-line max-lines-per-function
const entity = (context) => {
	const { data: { entityData, entityConfig, entityName }, cb } = context;
	const { data: { parentStatus }} = context;
	const currentStatus = entityData[statusKey];
	const { mapping } = entityConfig;

	const callBack = async () => {
		const data = await cb({
			...context,
			action: currentStatus,
			data: translate(entityData, flip(mapping)),
			entityName: entityName,
		});

		merge(
			entityData, translate(data, mapping), { [statusKey]: 'sync' }
		);
	};

	const process = () => processChildren({
		...context,
		data: {
			...context.data,
			parentStatus: currentStatus,
		},
	});

	const action = getAction({
		...context,
		data: {
			parentStatus: parentStatus,
			currentStatus: currentStatus,
			idExists: isDefined(entityData[idKey]),
		},
	});

	entityData[statusKey] = action;

	return asyncMap(action === 'delete'
		? [process, callBack]
		: [callBack, process], (fn) => fn());
};

const collection = (context) => {
	const {
		data: {
			entityName,
			entityData,
			entityConfig,
			parentStatus,
		},
	} = context;

	asyncMap(entityData, (item) => entity({
		...context,
		data: {
			entityName: entityName,
			entityData: item,
			entityConfig: entityConfig,
			parentStatus: parentStatus,
		},
	}));
};

const typeProcessors = {
	entity,
	collection,
};

module.exports = typeProcessors;
