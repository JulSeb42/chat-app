import type { Chat } from "./Chat.type"

export type User = {
	_id: string
	fullName: string
	email: string
	password: string
	avatar: string
	verified: boolean
	verifyToken: string
	resetToken?: string
	chats: Array<Chat>
}
