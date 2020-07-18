const jwt = require("jsonwebtoken");

const generateAuthToken = (user) =>
	jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);

module.exports = {
	generateAuthToken,
};
