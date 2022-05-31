const customer = {
	id: '',
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
			date: '',
			invoiceNumber: '',
			deliveryDate: '',
			deliveryAddress: {
				city: '',
				pincode: '',
				street: '',
				_status: 'create',
			},
			products: [
				{
					name: '',
					quantity: '',
					price: 1,
					_status: 'create',
				},
			],
			_status: 'create',
		},
	],

	// CRUD actions
	_status: 'delete',
};

module.exports = { customer };
