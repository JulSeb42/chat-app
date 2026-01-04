const SERVER_PATH_ROOTS = {
	AUTH: "/auth",
	USERS: "/users",
	UPLOADER: "/uploader",
	CHAT: "/chat",
	/* Prepend path root - DO NOT REMOVE */
}

export const SERVER_PATHS = {
	AUTH: {
		ROOT: SERVER_PATH_ROOTS.AUTH,
		SIGNUP: "/signup",
		LOGIN: "/login",
		LOGGED_IN: "/loggedin",
		VERIFY: "/verify",
		FORGOT_PASSWORD: "/forgot-password",
		RESET_PASSWORD: "/reset-password",
	},
	USERS: {
		ROOT: SERVER_PATH_ROOTS.USERS,
		ALL_USERS: "/all-users",
		GET_USER: (id = ":id") => `/user/${id}`,
		EDIT_ACCOUNT: (id = ":id") => `/edit-account/${id}`,
		EDIT_PASSWORD: (id = ":id") => `/edit-password/${id}`,
		DELETE_ACCOUNT: (id = ":id") => `/delete-account/${id}`,
	},
	UPLOADER: {
		ROOT: SERVER_PATH_ROOTS.UPLOADER,
		UPLOAD_PICTURE: "/upload-picture",
	},
	CHAT: {
		ROOT: SERVER_PATH_ROOTS.CHAT,
		ALL_CHATS: "/all-chats",
		GET_CHAT: (id = ":id") => `/chat/${id}`,
		EXISTING_CHAT: "/existing-chat",
		NEW_CHAT: "/new-chat",
		NEW_MESSAGE: (id = ":id") => `/new-message/${id}`,
		MARK_READ: (id = ":id") => `/mark-read/${id}`,
	},
	/* Prepend server path - DO NOT REMOVE */
}
