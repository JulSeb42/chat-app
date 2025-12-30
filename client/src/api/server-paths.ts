const SERVER_PATH_ROOTS = {
	AUTH: "/auth",
	USERS: "/users",
	ADMIN: "/admin",
	UPLOADER: "/uploader",
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
	ADMIN: {
		ROOT: SERVER_PATH_ROOTS.ADMIN,
		EDIT_ROLE: (id = ":id") => `/edit-role/${id}`,
		RESET_PASSWORD: (id = ":id") => `/reset-password/${id}`,
		DELETE_USER: (id = ":id") => `/delete-user/${id}`,
	},
	UPLOADER: {
		ROOT: SERVER_PATH_ROOTS.UPLOADER,
		UPLOAD_PICTURE: "/upload-picture",
	},
	/* Prepend server path - DO NOT REMOVE */
}
