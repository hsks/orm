const config = {
	statusKey: '_status',
	children: {
		customer: {
			path: '/',
			type: 'entity',
			maping: {
				name: './name',
				mobileNumber: './mobileNumber',
				age: './age',
				billingAddress: {
					city: './billingAddress/city',
				},
			},
			children: {
				orders: {
					path: './orders',
					type: 'collection',
					maping: {
						date: './date',
						invoiceNumber: './invoiceNumber',
						dateOfDelivery: './deliveryDate',
					},
					children: {
						deliveryAddress: {
							type: 'entity',
							path: './orders/deliveryAddress',
							maping: {
								city: './city',
								pincode: './pincode',
								street: './street',
							},
							children: {},
						},
						products: {
							type: 'collection',
							children: {},
							path: './orders/products',
							maping: {
								name: './name',
								quantity: './quantity',
								price: './price',
							},
						},
					},
				},
			},
		},
	},
};

module.exports = config;
