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

	const process = () => processChildren(context);

	const orders = action === 'delete'
		? [process, callBack]
		: [callBack, process];

	map(orders, (fn) => fn());
};

const collection = (context) => {
	const { data: { entityData, entityConfig }, data } = context;

	map(entityData, (entity) => {
		typeProcessors.entity({
			...context,
			data: {
				entityData: entity,
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
