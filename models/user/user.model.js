const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		minlength: 7,
		required: true,
	},
});

userSchema.pre("save", async function (next) {
	// this = user that is being saved/created
	this.password = await bcrypt.hash(this.password, 8);
	this.save();

	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
