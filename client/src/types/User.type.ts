export const userRoles = { user: "user", admin: "admin" } as const

export type UserRole = keyof typeof userRoles

export type User = {
	_id: string
	fullName: string
	email: string
	password: string
	avatar: string
	role: UserRole
	verified: boolean
	verifyToken: string
	resetToken?: string
}
