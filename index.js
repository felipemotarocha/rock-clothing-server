const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema/schema");
require("dotenv").config();
require("./db/mongoose");

const app = express();

// Middlewares
const cors = require("cors");
app.use(cors());

// GraphQL Route
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));
