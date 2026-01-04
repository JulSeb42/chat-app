import { Router } from "express"
import { SERVER_PATHS } from "utils"
import auth from "./auth"
import user from "./user"
import uploader from "./uploader"
import chat from "./chat"
/* Prepend import new route - DO NOT REMOVE */

const router = Router()

router.get("/", (_, res) => {
	res.json("All good in here")
})

router.use(SERVER_PATHS.AUTH.ROOT, auth)
router.use(SERVER_PATHS.USERS.ROOT, user)
router.use(SERVER_PATHS.UPLOADER.ROOT, uploader)
router.use(SERVER_PATHS.CHAT.ROOT, chat)
/* Prepend router use - DO NOT REMOVE */

export default router
