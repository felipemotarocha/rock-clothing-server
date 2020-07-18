const collectionResolvers = require("./collection/collection.resolvers");
const userResolvers = require("./user/user.resolvers");

const resolvers = [collectionResolvers, userResolvers];

module.exports = resolvers;
