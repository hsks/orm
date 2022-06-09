const { translate, flip, merge } = require('@laufire/utils/collection');
const { asyncMap } = require('./helpers');

const processChildren = (context) => {
	const { data: { entityConfig: { children }}} = context;
	const { data: { entityData }} = context;

	return asyncMap(children, (childConfig, name) => {
		const { type } = childConfig;

		// eslint-disable-next-line no-use-before-define
		return typeProcessors[type]({
			...context,
			data: {
				entityName: name,
				entityData: entityData[name],
				entityConfig: childConfig,
			},
		});
	});
};

// eslint-disable-next-line max-lines-per-function
const entity = (context) => {
	const { data: { entityData, entityConfig, entityName }, cb } = context;
	const { config: { statusKey }} = context;
	const { [statusKey]: action } = entityData;
	const { mapping } = entityConfig;

	const callBack = () => {
		const data = cb({
			...context,
			action: action,
			data: translate(entityData, flip(mapping)),
			entityName: entityName,
		});

		merge(
			entityData, translate(data, mapping), { [statusKey]: 'sync' }
		);
	};

	const process = () => processChildren(context);

	asyncMap(action === 'delete'
		? [process, callBack]
		: [callBack, process], (fn) => fn());
};

const collection = (context) => {
	const { data: { entityData, entityConfig, entityName }} = context;

	asyncMap(entityData, (item) => entity({
		...context,
		data: {
			entityName: entityName,
			entityData: item,
			entityConfig: entityConfig,
		},
	}));
};

const typeProcessors = {
	entity,
	collection,
};

module.exports = typeProcessors;
