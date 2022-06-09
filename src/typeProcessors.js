const {	translate, flip, merge } = require('@laufire/utils/collection');
const { asyncMap } = require('./helpers');

const processChildren = (context) => {
	const { data: { entityConfig: { children }}} = context;
	const { data: { entityData }} = context;

	asyncMap(children, (childConfig, name) => {
		const { type } = childConfig;

		// eslint-disable-next-line no-use-before-define
		typeProcessors[type]({
			...context,
			data: {
				entityData: entityData[name],
				entityConfig: childConfig,
			},
		});
	});
};

// eslint-disable-next-line max-lines-per-function
const entity = (context) => {
	const { data: { entityData, entityConfig }, cb } = context;
	const { config: { statusKey }} = context;
	const { [statusKey]: action } = entityData;
	const { maping } = entityConfig;

	const callBack = () => {
		const data = cb({
			...context,
			data: {
				action: action,
				maping: translate(entityData, flip(maping)),
			},
		});

		merge(
			entityData, translate(data, maping), { [statusKey]: 'sync' }
		);
	};

	const process = () => processChildren(context);

	asyncMap(action === 'delete'
		? [process, callBack]
		: [callBack, process], (fn) => fn());
};

const collection = (context) => {
	const { data: { entityData, entityConfig }} = context;

	asyncMap(entityData, (item) => {
		entity({
			...context,
			data: {
				entityData: item,
				entityConfig: entityConfig,
			},
		});
	});
};

const typeProcessors = {
	entity,
	collection,
};

module.exports = typeProcessors;
