const {
	map, translate, flip,
	clone, merge,
} = require('@laufire/utils/collection');

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
			entityData, translate(data, maping), { _status: 'sync' }
		);
	};

	const process = () => processChildren(context);

	const orders = action === 'delete'
		? [process, callBack]
		: [callBack, process];

	const asyncMap = async (data) => {
		const duplicates = clone(data);

		for(let index = 0; index < duplicates.length; index++)
			await duplicates[index]();
	};

	asyncMap(orders);
};

const collection = (context) => {
	const { data: { entityData, entityConfig }} = context;

	map(entityData, (item) => {
		// eslint-disable-next-line no-use-before-define
		typeProcessors.entity({
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

const processChildren = (context) => {
	const { data: { entityConfig: { children }}} = context;
	const { data: { entityData }} = context;

	map(children, (childConfig, name) => {
		const { type } = childConfig;

		typeProcessors[type]({
			...context,
			data: {
				entityData: entityData[name],
				entityConfig: childConfig,
			},
		});
	});
};

const traverse = (context) => {
	const { source, config: { children }} = context;

	map(source, (entityData, entityName) => {
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
