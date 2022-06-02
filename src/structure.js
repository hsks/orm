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
			id: '',
			date: '',
			invoiceNumber: '',
			deliveryDate: '',
			deliveryAddress: {
				id: '',
				city: '',
				pincode: '',
				street: '',
				_status: 'create',
			},
			products: [
				{
					id: '',
					name: '',
					quantity: '',
					price: 1,
					_status: 'create',
				},
			],
			_status: 'delete',
		},
	],

	// CRUD actions
	_status: 'create',
};

module.exports = { customer };
