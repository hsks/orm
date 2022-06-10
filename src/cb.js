const cb = ({ entityName, id, action, data }) =>
	// eslint-disable-next-line no-console
	console.log(
		entityName, id, action, data
	);

module.exports = cb;
