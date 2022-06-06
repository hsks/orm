const { map, translate } = require('@laufire/utils/collection');

const entity = (context) => {
	const { data: { entityData, entityConfig }, cb } = context;
	const { config: { statusKey }} = context;
	const { [statusKey]: action } = entityData;
	const { maping } = entityConfig;

	const callBack = () => cb({
		...context,
		data: {
			action: action,
			maping: translate(entityData, maping),
		},
	});

	// eslint-disable-next-line no-undef
	const process = () => processChildren(context);

	const orders = action === 'delete'
		? [process, callBack]
		: [callBack, process];

	map(orders, (fn) => fn());
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
