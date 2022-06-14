const parser = require('./parser');
const source = require('./structure');
const config = require('./config');
const cb = require('./cb');
const fetchTrial = require('./builtEntity');
const { idKey, statusKey } = require('./constants');

parser({ source, config, cb });

fetchTrial({
	source: {
		customer: {
			[idKey]: '',
			[statusKey]: 'fetch',
		},
	},
	config: {
		customer: {
			statusKey: statusKey,
			type: 'entity',
			children: {
				orders: {
					type: 'collection',
					children: {
						deliveryAddress: {
							type: 'entity',
							children: {},
						},
						products: {
							type: 'collection',
							children: {},
						},
					},
				},
			},
		},
	},
	cb: cb,
});
