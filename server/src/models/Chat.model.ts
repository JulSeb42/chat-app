import { Schema, model } from "mongoose"
import type { Chat } from "types"

const chatSchema = new Schema<Chat>(
	{
		name: String,
		users: [{ type: Schema.Types.ObjectId, ref: "User" }],
		messages: [
			{
				body: String,
				sender: { type: Schema.Types.ObjectId, ref: "User" },
				readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
				createdAt: Date,
			},
		],
	},
	{ timestamps: true },
)

export const ChatModel = model<Chat>("Chat", chatSchema)
