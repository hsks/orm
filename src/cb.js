const cb = ({ entityName, action, data }) => {
	// eslint-disable-next-line no-console
	console.log({ entityName, action, data });

	return data;
};

module.exports = cb;
