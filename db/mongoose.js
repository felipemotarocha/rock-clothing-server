const mongoose = require("mongoose");

mongoose.connect(
	`mongodb+srv://guest:${process.env.DB_PASSWORD}@rock-clothing-cluster-uldx1.gcp.mongodb.net/rock-clothing?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	}
);
