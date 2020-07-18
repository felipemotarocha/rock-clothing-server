const jwt = require("jsonwebtoken");
const User = require("../../models/user/user.model");

const auth = async (req, res, next) => {
	try {
		const authHeader = req.get("Authorization");
		if (!authHeader) throw new Error();

		const token = authHeader.split(" ")[1];
		if (!authHeader) throw new Error();

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (!decodedToken) throw new Error();

		const user = await User.findById(decodedToken.userId);
		if (!user) throw new Error();

		req.isAuth = true;
		req.user = user;
		next();
	} catch (err) {
		req.isAuth = false;
		next();
	}
};

module.exports = auth;
