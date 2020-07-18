const collectionType = require("./types/collection/collection.types");
const productType = require("./types/product/product.types");
const userType = require("./types/user/user.types");
const query = require("./query");
const mutation = require("./mutation");

const typeDefs = [query, mutation, collectionType, productType, userType];

module.exports = typeDefs;
