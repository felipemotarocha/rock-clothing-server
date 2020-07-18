const Collection = require("../../../models/collection/collection.model");
const Product = require("../../../models/product/product.model");

const collectionResolvers = {
	Query: {
		collection: (_parent, { id, title }) => {
			if (id) return Collection.findById(id);
			if (title) return Collection.findOne({ routeName: title });
		},
		collections: () => {
			return Collection.find({});
		},
	},
	Collection: {
		products: (parent) => {
			return Product.find({ collectionId: parent.id });
		},
	},
};

module.exports = collectionResolvers;
