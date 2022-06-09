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
			mapping: {
				name: 'name',
			},
			children: {
				orders: {
					type: 'collection',
					path: './orders',
					mapping: {
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

		const expectations = [
			{
				...context,
				action: 'delete',
				data: {
					childName,
				},
			},
			{
				...context,
				action: 'delete',
				data: {
					name,
				},
			},
			{
				...context,
				action: 'update',
				data: {
					name,
				},
			},
			{
				...context,
				action: 'update',
				data: {
					childName,
				},
			},
		];

		expect(cb.mock.calls.map(([value]) => value)).toEqual(expectations);
	});
});
