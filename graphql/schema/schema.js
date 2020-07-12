const graphql = require("graphql");
const Product = require("../../models/product/product.model");
const Collection = require("../../models/collection/collection.model");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
} = graphql;

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    imageUrl: { type: GraphQLString },
    collection: {
      type: CollectionType,
      resolve({ collectionId }, args) {
        return Collection.findById(collectionId);
      },
    },
  }),
});

const CollectionType = new GraphQLObjectType({
  name: "Collection",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    routeName: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve({ id }, args) {
        return Product.find({ collectionId: id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    collection: {
      type: CollectionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Collection.findById(id);
      },
    },
    collection: {
      type: CollectionType,
      args: { title: { type: GraphQLString } },
      resolve(parent, { title }) {
        return Collection.findOne({ routeName: title });
      },
    },
    collections: {
      type: new GraphQLList(CollectionType),
      resolve(parent, args) {
        return Collection.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
