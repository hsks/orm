const { find, contains } = require('@laufire/utils/collection');
const { isDefined } = require('@laufire/utils/reflection');

describe('getAction', () => {
	test('getAction return appropriate action.', () => {
		const rules = [
			{
				parentStatus: 'delete',
				idExists: true,
				action: 'delete',
			},
			{
				parentStatus: 'delete',
				idExists: false,
				action: 'uiDelete',
			},
			{
				currentStatus: 'delete',
				idExists: true,
				action: 'delete',
			},
			{
				currentStatus: 'delete',
				idExists: false,
				action: 'uiDelete',
			},
			{
				parentStatus: 'create',
				action: 'create',
			},
			{
				idExists: false,
				action: 'create',
			},
			{
				currentStatus: 'update',
				idExists: true,
				action: 'update',
			},
			{
				currentStatus: 'read',
				idExists: true,
				action: 'read',
			},
			{
				idExists: true,
				action: 'error',
			},
		];

		rules.forEach(({ action, ...rule }) => {
			const expected = find(rules, (data) => contains(data, rule));

			expect(isDefined(expected)).toEqual(true);
		});
	});
});
