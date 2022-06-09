const { statusKey, id } = require('./constants');

const config = {
	statusKey: statusKey,
	id: id,
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
						[id]: 'id',
					},
					children: {
						deliveryAddress: {
							type: 'entity',
							path: './orders/deliveryAddress',
							mapping: {
								city: 'city',
								pincode: 'pincode',
								street: 'Lane',
								[id]: 'id',
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
								[id]: 'id',
							},
						},
					},
				},
			},
		},
	},
};

module.exports = config;
