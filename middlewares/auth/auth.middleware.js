const jwt = require("jsonwebtoken");
const User = require("../../models/user/user.model");

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		if (!token) throw new Error();

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (!decodedToken) throw new Error();

		const user = await User.findById(decodedToken.userId);
		if (!user) throw new Error();

		req.isAuth = true;
		req.userId = decodedToken.userId;
		next();
	} catch (err) {
		req.isAuth = false;
		next();
	}
};

module.exports = auth;
