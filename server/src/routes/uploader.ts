import { Router } from "express"
import { fileUploader } from "../config/cloudinary.config"
import { SERVER_PATHS } from "../utils"

const router = Router()

router.put(
	SERVER_PATHS.UPLOADER.UPLOAD_PICTURE,
	(req, _, next) => {
		console.log("🔍 Upload request details:", {
			method: req.method,
			url: req.url,
			contentType: req.get("Content-Type"),
			hasBody: Object.keys(req.body || {}).length > 0,
			bodyKeys: Object.keys(req.body || {}),
		})
		next()
	},
	fileUploader.single("image"),
	(req, res, next) => {
		try {
			if (
				!process.env.CLOUDINARY_NAME ||
				!process.env.CLOUDINARY_KEY ||
				!process.env.CLOUDINARY_SECRET
			) {
				console.error("❌ Missing Cloudinary configuration")
				return res.status(500).json({
					errorMessage:
						"Server configuration error: Missing Cloudinary credentials",
				})
			}

			if (!req.file) {
				console.error(
					"❌ No file uploaded - multer didn't process any file",
				)
				return res.status(400).json({
					errorMessage: "No file uploaded",
				})
			}

			console.log("✅ File uploaded successfully:", req.file.path)
			res.json({ image_url: req.file.path })
		} catch (error) {
			console.error("❌ Upload error:", error)
			next(error)
		}
	},
)

export default router
