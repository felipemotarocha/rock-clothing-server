const graphql = require("graphql");
const bcrypt = require("bcryptjs");
const Product = require("../../models/product/product.model");
const Collection = require("../../models/collection/collection.model");
const User = require("../../models/user/user.model");

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

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		password: { type: GraphQLString },
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
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return User.findById(id);
			},
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find({});
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		createNewUser: {
			type: UserType,
			args: {
				name: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString },
			},
			async resolve(parent, { name, email, password }) {
				const existingUser = await User.findOne({ email });

				if (existingUser) throw new Error("This email is already in use!");
				if (password.length < 7)
					throw new Error("The password must contain at least 7 characters.");

				const user = new User({ name, email, password });
				return user.save();
			},
		},
		login: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString },
			},
			async resolve(parent, { email, password }) {
				try {
					const user = await User.findOne({ email });
					if (!user) throw new Error("Invalid credentials!");

					const isEqual = await bcrypt.compare(password, user.password);
					if (!isEqual) throw new Error("Invalid credentials!");

					return true;
				} catch (err) {
					return false;
				}
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
