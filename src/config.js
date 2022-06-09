const config = {
	statusKey: '_status',
	children: {
		customer: {
			path: '/',
			type: 'entity',
			mapping: {
				name: 'fullName',
				mobileNumber: 'mobileNumber',
				age: 'age',
				billingAddress: 'billingAddress',
			},
			children: {
				orders: {
					path: './orders',
					type: 'collection',
					mapping: {
						date: 'date',
						invoiceNumber: 'invoiceNumber',
						deliveryDate: 'dateOfDelivery',
					},
					children: {
						deliveryAddress: {
							type: 'entity',
							path: './orders/deliveryAddress',
							mapping: {
								city: 'city',
								pincode: 'pincode',
								street: 'Lane',
							},
							children: {},
						},
						products: {
							type: 'collection',
							children: {},
							path: './orders/products',
							mapping: {
								name: 'name',
								quantity: 'quantity',
								price: 'price',
							},
						},
					},
				},
			},
		},
	},
};

module.exports = config;
