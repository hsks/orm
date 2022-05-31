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
		parentStatus: 'uiDelete',
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
];

module.exports = rules;
