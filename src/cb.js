const { sleep, peek } = require('@laufire/utils/debug');
const { idKey, statusKey } = require('./constants');

const deliveryAddress = {
	[idKey]: '',
	city: '',
	pincode: '',
	street: '',
	[statusKey]: 'create',
};
const products = [
	{
		[idKey]: '',
		name: '',
		quantity: '',
		price: 1,
		[statusKey]: 'create',
	},
];
const apiData = {
	deliveryAddress: deliveryAddress,
	products: products,
	orders: [
		{
			[idKey]: '',
			date: '',
			invoiceNumber: '',
			deliveryDate: '',
			[statusKey]: 'delete',
		},
	],
};

const cb = async ({ entityName, action, data }) => {
	peek({ entityName, action, data });
	const duration = 2000;

	await sleep(duration);

	return apiData[entityName] || data;
};

module.exports = cb;
