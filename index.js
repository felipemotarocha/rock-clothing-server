const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs/index");
const resolvers = require("./graphql/resolvers/index");
const auth = require("./middlewares/auth/auth.middleware");
require("dotenv").config();
require("./db/mongoose");

const app = express();
app.use(auth);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));
