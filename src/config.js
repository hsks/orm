const config = {
	statusKey: '_status',
	children: {
		customer: {
			path: '/',
			type: 'entity',
			maping: {
				name: 'fullName',
				mobileNumber: 'mobileNumber',
				age: 'age',
				billingAddress: 'billingAddress',
			},
			children: {
				orders: {
					path: './orders',
					type: 'collection',
					maping: {
						date: 'date',
						invoiceNumber: 'invoiceNumber',
						deliveryDate: 'dateOfDelivery',
					},
					children: {
						deliveryAddress: {
							type: 'entity',
							path: './orders/deliveryAddress',
							maping: {
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
							maping: {
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
