const { statusKey, idKey } = require('./constants');

const customer = {
	name: '',
	mobileNumber: '',
	age: '',
	billingAddress: {
		city: '',
		pincode: '',
		street: '',
	},
	orders: [
		{
			[idKey]: '',
			date: '',
			invoiceNumber: '',
			deliveryDate: '',
			deliveryAddress: {
				[idKey]: '',
				city: '',
				pincode: '',
				street: '',
				[statusKey]: 'create',
			},
			products: [
				{
					[idKey]: '',
					name: '',
					quantity: '',
					price: 1,
					[statusKey]: 'create',
				},
			],
			[statusKey]: 'delete',
		},
	],

	// CRUD actions
	[statusKey]: 'create',
};

module.exports = { customer };
