const { gql } = require("apollo-server");

const query = gql`
	type Query {
		collection(id: ID, title: String): Collection
		collections: [Collection!]
		user(id: ID!): User
		users: [User!]
	}
`;

module.exports = query;
