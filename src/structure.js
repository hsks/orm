const { statusKey, id } = require('./constants');

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
			[id]: '',
			date: '',
			invoiceNumber: '',
			deliveryDate: '',
			deliveryAddress: {
				[id]: '',
				city: '',
				pincode: '',
				street: '',
				[statusKey]: 'create',
			},
			products: [
				{
					[id]: '',
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
