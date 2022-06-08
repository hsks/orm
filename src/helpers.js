const { keys } = require('@laufire/utils/lib');
const { shell } = require('@laufire/utils/collection');

const helpers = {
	asyncMap: (collection, cb) => {
		const ret = shell(collection);

		const collectionKeys = keys(collection);

		collectionKeys.forEach(async (key) => (ret[key] = await cb(
			collection[key], key, collection
		)));
		return ret;
	},
};

module.exports = helpers;
