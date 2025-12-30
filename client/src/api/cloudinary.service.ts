import { http } from "api"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"

type PATHS = keyof typeof SERVER_PATHS.UPLOADER

const generateRoute = (route: Exclude<PATHS, "ROOT">) =>
	generateServerRoute("UPLOADER", route)

const errorHandler = (err: any) => {
	throw err
}

const uploadImage = async (file: any) =>
	await http
		.put(generateRoute("UPLOAD_PICTURE"), file, {
			headers: {
				"Content-Type": undefined, // Let browser set multipart/form-data with boundary
			},
		})
		.then(res => res.data)
		.catch(errorHandler)

export const cloudinaryService = {
	uploadImage,
}
