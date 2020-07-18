const { gql } = require("apollo-server");

const mutation = gql`
	type LoginAndRegisterResponse {
		user: User!
		authToken: String!
	}

	type Mutation {
		register(
			name: String!
			email: String!
			password: String!
		): LoginAndRegisterResponse!
		login(email: String!, password: String!): LoginAndRegisterResponse!
	}
`;

module.exports = mutation;
