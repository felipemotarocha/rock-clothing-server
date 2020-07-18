const { gql } = require("apollo-server");

const userType = gql`
	type User {
		id: ID!
		name: String!
		email: String!
		password: String!
	}
`;

module.exports = userType;
