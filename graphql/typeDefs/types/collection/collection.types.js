const { gql } = require("apollo-server");

const collectionType = gql`
	type Collection {
		id: ID
		title: String
		imageUrl: String
		routeName: String
		products: [Product!]
	}
`;

module.exports = collectionType;
