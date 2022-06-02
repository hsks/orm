const { map, translate } = require('@laufire/utils/collection');
const cb = require('./cb');

const typeProcessors = {
	// eslint-disable-next-line max-lines-per-function
	entity: (context) => {
		const { data: { entityData, entityConfig }, data } = context;
		const { _status } = entityData;
		const { maping, children } = entityConfig;

		_status !== 'delete' && cb({
			...context,
			data: {
				action: _status,
				maping: translate(entityData, maping),
			},
		});

		map(children, (entity) => {
			const builtContext = {
				...context,
				data: { ...data, entityData: entity },
			};

			_status === 'delete'
				? processDelete(builtContext)
				: process(builtContext);
		});
	},
	collection: (context) => {
		const { data: { entityData }, data } = context;

		map(entityData, (entity) => {
			const { _status } = entity;
			const builtContext = {
				...context,
				data: { ...data, entityData: entity },
			};

			_status === 'delete'
				? processDelete(builtContext)
				: process(builtContext);
		});
	},
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

const deleteEntity = (context) => {
	const { data: { entityConfig: { maping }}} = context;
	const { data: { entityData: { _status }, entityData }} = context;

	processChildren(context);
	cb({
		...context,
		data: {
			action: _status,
			maping: translate(entityData, maping),
		},
	});
};

const processDelete = (context) => {
	const { data: { entityData, entityConfig }} = context;
	const { maping } = entityConfig;
	const { _status } = entityData;

	deleteEntity(context);

	cb({
		...context,
		data: {
			action: _status,
			maping: translate(entityData, maping),
		},
	});
};

const process = (context) => {
	const { data: { entityData, entityConfig }} = context;
	const { maping } = entityConfig;
	const { _status } = entityData;

	cb({
		...context,
		data: {
			action: _status,
			maping: translate(entityData, maping),
		},
	});
	processChildren(context);
};

const traverse = (context) => {
	const { source, config: { children }} = context;

	map(source, (entityData, entityName) => {
		const { _status } = entityData;
		const entityConfig = children[entityName];
		const builtContext = {
			...context, data: {
				entityData,
				entityConfig,
			},
		};

		_status === 'delete'
			? processDelete(builtContext)
			: process(builtContext);
	});
};

module.exports = traverse;
