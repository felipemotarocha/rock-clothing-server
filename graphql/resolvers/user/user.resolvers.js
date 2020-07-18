const User = require("../../../models/user/user.model");
const bcrypt = require("bcryptjs");
const { generateAuthToken } = require("./user.utils");

const userResolvers = {
	Query: {
		user: async (_parent, { id }) => await User.findById(id),
		users: async () => await User.find({}),
		userProfile: (parent, args, { req: { isAuth, user } }, info) => {
			if (!isAuth) throw new Error("Please authenticate and try again.");
			return user;
		},
	},
	Mutation: {
		register: async (_parent, { name, email, password }) => {
			const existingUser = await User.findOne({ email });

			if (existingUser) {
				throw new Error("This email is already in use.");
			}

			if (password.length < 7) {
				throw new Error("The password must contain at least 7 characters.");
			}

			const user = new User({ name, email, password });
			user.save();

			return {
				user,
				authToken: generateAuthToken(user),
			};
		},
		login: async (_parent, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new Error("Invalid credentials. Check the data and try again.");
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				throw new Error("Invalid credentials. Check the data and try again.");
			}

			return {
				user,
				authToken: generateAuthToken(user),
			};
		},
	},
};

module.exports = userResolvers;
