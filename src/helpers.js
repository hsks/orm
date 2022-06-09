const { keys } = require('@laufire/utils/lib');
const { shell } = require('@laufire/utils/collection');

const helpers = {
	asyncMap: async (collection, cb) => {
		const ret = shell(collection);

		const collectionKeys = keys(collection);

		let i = 0;

		while(i < collectionKeys.length) {
			const key = collectionKeys[i];

			// eslint-disable-next-line no-await-in-loop
			ret[key] = await cb(
				collection[key], key, collection
			);
			i++;
		}

		return ret;
	},
};

module.exports = helpers;
