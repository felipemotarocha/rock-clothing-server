const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs/index");
const resolvers = require("./graphql/resolvers/index");
const auth = require("./middlewares/auth/auth.middleware");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("./db/mongoose");

const app = express();
app.use(auth);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app, auth });

app.use(cors());

app.get("/product-payment", async ({ query: { amount } }, res) => {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price_data: {
					currency: "usd",
					unit_amount: amount,
					product_data: {
						name: "ROCK-CLOTHING",
					},
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${process.env.CLIENT_URL}/payment-successful?amount=${
			amount / 100
		}`,
		cancel_url: `${process.env.CLIENT_URL}/payment-failure?amount=${
			amount / 100
		}`,
	});
	res.status(200).send({ sessionId: session.id });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));
