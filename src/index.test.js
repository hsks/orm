const { map } = require('@laufire/utils/collection');
const parser = require('./parser');

describe('parser', () => {
	test('parses the data and make necessery actions.', () => {
		const name = Symbol('name');
		const childName = Symbol('childName');
		const id = Symbol('id');

		const generateSkeleton = ({ parentStatus, childStatus }) => ({
			id: id,
			name: name,
			orders: [
				{
					id: id,
					childName: childName,
					_status: childStatus,
				},
			],
			_status: parentStatus,
		});
		const customer = generateSkeleton({
			parentStatus: 'delete',
			childStatus: 'create',
		});
		const student = generateSkeleton({
			parentStatus: 'delete',
			childStatus: 'delete',
		});
		const source = {
			customer,

		};
		const customerConfig = {
			type: 'entity',
			path: '/',
			maping: {
				name: 'name',
			},
			children: {
				orders: {
					type: 'collection',
					path: './orders',
					maping: {
						childName: 'childName',
					},
					children: {},
				},
			},
		};
		const config = {
			statusKey: '_status',
			children: {
				customer: customerConfig,
				student: customerConfig,
			},
		};
		const cb = jest.fn();
		const context = { source, config, cb };

		parser(context);
		const expections = [
			{
				...context,
				data: {
					action: 'delete',
					maping: {
						childName,
					},
				},
			},
			{
				...context,
				data: {
					action: 'delete',
					maping: {
						name,
					},
				},
			},
			{
				...context,
				data: {
					action: 'delete',
					maping: {
						name,
					},
				},
			},
			{
				...context,
				data: {
					action: 'delete',
					maping: {
						childName,
					},
				},
			},
		];

		map(expections, (expected) =>
			expect(cb).toHaveBeenCalledWith(expected));
	});
});
