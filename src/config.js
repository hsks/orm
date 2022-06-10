const { statusKey, idKey } = require('./constants');

const config = {
	statusKey: statusKey,
	id: idKey,
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
						[idKey]: 'id',
					},
					children: {
						deliveryAddress: {
							type: 'entity',
							path: './orders/deliveryAddress',
							mapping: {
								city: 'city',
								pincode: 'pincode',
								street: 'Lane',
								[idKey]: 'id',
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
								[idKey]: 'id',
							},
						},
					},
				},
			},
		},
	},
};

module.exports = config;
