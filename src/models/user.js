const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			validate: function (value) {
				if (
					value === "admin" ||
					value === "superAdmin" ||
					value === "doctor"
				) {
					throw new Error("name must be valid");
				}

				return true;
			},
		},

		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},

		mobile: {
			type: String,
			required: true,
			trim: true,
			minlength: 11,
			maxlength: 13,
		},

		password: {
			type: String,
			required: true,
		},

		isBlock: {
			type: Boolean,
			default: false,
		},

		role: {
			type: String,
			enum: ["admin", "superAdmin", "customer"],
			default: "customer",
		},

		forgetToken : String,

		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(12));
	}
	
	next();
});

userSchema.statics.findByCredential = async (
	password,
	mobile
) => {
	const user = await User.findOne({ mobile : mobile});

    if(!user) {
        throw new Error('Unable to login');
    }
	
    const isMatch = bcrypt.compareSync(password , user.password)
	
    if(!isMatch) {
        throw new Error('Unable to login');
    }
	
    return user;
};

userSchema.methods.toJSON = function () {
	const user = this.toObject();

	delete user.password;
	delete user.tokens;
	delete user.isBlock;

	return user;
};

userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign(
		{ _id: this._id.toString() },
		process.env.APP_SECRET
	);
	try {
		this.tokens = this.tokens.concat({ token });
		await this.save();
		return token;
	} catch (e) {
		throw new Error(e);
	}
};

const User = mongoose.model("User", userSchema);

module.exports = User;
