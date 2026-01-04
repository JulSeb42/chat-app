import type { User } from "./User.type"

export type Chat = {
	_id: string
	name?: string
	users: Array<User>
	messages: Array<Message>
	createdAt: Date
	updatedAt: Date
}

export type Message = {
	_id: string
	body: string
	sender: User
	readBy: Array<string> // Array of user IDs who have read this message
	createdAt?: Date
}

export type NewChatFormData = {
	users: Array<string>
}

export type NewMessageFormData = {
	body: string
	sender: User
}

export type ReadMessageFormData = {
	user: string
}
