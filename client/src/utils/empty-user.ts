import type { User } from "types"

export const emptyUser: User = {
	_id: "",
	email: "",
	fullName: "",
	password: "",
	verified: false,
	verifyToken: "",
	resetToken: "",
	avatar: "",
	role: "user",
}
