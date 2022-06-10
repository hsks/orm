const parser = require('./parser');
const { statusKey, idKey } = require('./constants');

describe('parser', () => {
	test('parses the data and make necessary actions.', async () => {
		const parentProp = Symbol('parentProp');
		const childProp = Symbol('childProp');
		const id = Symbol('id');

		const generateSkeleton = ({ parentStatus, childStatus, childName }) =>
			({
				config: {
					type: 'entity',
					path: '/',
					mapping: {
						id: [idKey],
						parentProp: 'parentProp',
					},
					children: {
						[childName]: {
							type: 'collection',
							path: childName,
							mapping: {
								id: [idKey],
								childProp: 'childProp',
							},
							children: {},
						},
					},
				},
				source: {
					[idKey]: id,
					parentProp: parentProp,
					[childName]: [
						{
							[idKey]: id,
							childProp: childProp,
							[statusKey]: childStatus,
						},
					],
					[statusKey]: parentStatus,
				},
			});
		const {
			config: customerConfig,
			source: customerSource,
		} = generateSkeleton({
			parentStatus: 'delete',
			childStatus: 'create',
			childName: 'orders',
		});
		const {
			config: studentConfig,
			source: studentSource,
		} = generateSkeleton({
			parentStatus: 'update',
			childStatus: 'update',
			childName: 'marks',
		});
		const source = {
			customer: customerSource,
			student: studentSource,
		};
		const config = {
			statusKey: statusKey,
			id: idKey,
			children: {
				customer: customerConfig,
				student: studentConfig,
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
					id,
					childProp,
				},
				entityName: 'orders',
			},
			{
				...context,
				action: 'delete',
				data: {
					id,
					parentProp,
				},
				entityName: 'customer',
			},
			{
				...context,
				action: 'update',
				data: {
					id,
					parentProp,
				},
				entityName: 'student',
			},
			{
				...context,
				action: 'update',
				data: {
					id,
					childProp,
				},
				entityName: 'marks',
			},
		];

		expect(cb.mock.calls.map(([value]) => value)).toEqual(expectations);
	});
});
