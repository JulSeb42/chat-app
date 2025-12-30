import { Schema, model } from "mongoose"
import { userRoles, type User } from "types"

const userSchema = new Schema<User>(
	{
		email: { type: String, required: true, unique: true },
		fullName: { type: String, required: true },
		password: String,
		verified: Boolean,
		verifyToken: String,
		resetToken: String,
		avatar: String,
		role: { type: String, enum: Object.keys(userRoles), default: "user" },
	},
	{ timestamps: true }
)

export const UserModel = model<User>("User", userSchema)
