const parser = require('./parser');

describe('parser', () => {
	test('parses the data and make necessary actions.', async () => {
		const name = Symbol('name');
		const childName = Symbol('childName');
		const id = Symbol('id');
		const statusKey = '_status';

		const generateSkeleton = ({ parentStatus, childStatus }) => ({
			id: id,
			name: name,
			orders: [
				{
					id: id,
					childName: childName,
					[statusKey]: childStatus,
				},
			],
			[statusKey]: parentStatus,
		});
		const customer = generateSkeleton({
			parentStatus: 'delete',
			childStatus: 'create',
		});
		const student = generateSkeleton({
			parentStatus: 'update',
			childStatus: 'update',
		});
		const source = {
			customer,
			student,
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

		await parser(context);
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
					action: 'update',
					maping: {
						name,
					},
				},
			},
			{
				...context,
				data: {
					action: 'update',
					maping: {
						childName,
					},
				},
			},
		];

		// Map(expections, (expected) =>
		// 	Expect(cb).toHaveBeenCalledWith(expected));

		expect(cb.mock.calls.map(([value]) => value)).toEqual(expections);
	});
});
