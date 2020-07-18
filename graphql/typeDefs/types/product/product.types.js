const { gql } = require("apollo-server");

const productType = gql`
	type Product {
		id: ID
		name: String
		price: Float
		imageUrl: String
		collectionId: Collection
	}
`;

module.exports = productType;
