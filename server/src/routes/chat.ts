import { Router } from "express"
import { ChatModel, UserModel } from "../models"
import { SERVER_PATHS, encrypt, decrypt } from "../utils"

const router = Router()

const { CHAT: PATHS } = SERVER_PATHS

router.get(PATHS.ALL_CHATS, async (_, res, next) => {
	return await ChatModel.find()
		.populate("users")
		.then(chatFromDb => res.status(200).json(chatFromDb))
		.catch(err => next(err))
})

router.get(PATHS.GET_CHAT(), async (req, res, next) => {
	return await ChatModel.findById(req.params.id)
		.populate("users")
		.populate({
			path: "messages",
			populate: { path: "sender", model: "User" },
		})
		.then(chatFromDb => {
			chatFromDb?.messages.forEach(
				message => (message.body = decrypt(message.body)),
			)

			return res.status(200).json(chatFromDb)
		})
		.catch(err => next(err))
})

router.get(PATHS.EXISTING_CHAT, async (req, res, next) => {
	const { user1, user2 } = req.query as { user1: string; user2: string }

	return await ChatModel.findOne({ users: { $all: [user1, user2] } })
		.then(foundChat => {
			if (foundChat) return res.status(200).json(foundChat)
			return res.status(404).json({ message: "No chat found" })
		})
		.catch(err => next(err))
})

router.post(PATHS.NEW_CHAT, async (req, res, next) => {
	const { users } = req.body

	return await ChatModel.create({ users })
		.then(async createdChat => {
			return await UserModel.findByIdAndUpdate(
				users[0],
				{
					$push: { chats: createdChat._id },
				},
				{ new: true },
			).then(async () => {
				return await UserModel.findByIdAndUpdate(
					users[1],
					{
						$push: { chats: createdChat._id },
					},
					{ new: true },
				).then(() => res.status(201).json(createdChat))
			})
		})
		.catch(err => next(err))
})

router.put(PATHS.NEW_MESSAGE(), async (req, res, next) => {
	const { sender, body } = req.body

	return await ChatModel.findByIdAndUpdate(
		req.params.id,
		{
			$push: {
				messages: {
					body: encrypt(body),
					sender,
					readBy: [sender],
					createdAt: new Date(),
				},
			},
		},
		{ new: true },
	)
		.populate("users")
		.populate({
			path: "messages",
			populate: { path: "sender", model: "User" },
		})
		.then(updatedChat => {
			updatedChat?.messages.forEach(
				message => (message.body = decrypt(message.body)),
			)

			return res.status(201).json(updatedChat)
		})
		.catch(err => next(err))
})

router.put(PATHS.MARK_READ(), async (req, res, next) => {
	const { user } = req.body

	return await ChatModel.findByIdAndUpdate(
		req.params.id,
		{
			$addToSet: { "messages.$[].readBy": user },
		},
		{ new: true },
	)
		.then(updatedChat => res.status(200).json(updatedChat))
		.catch(err => next(err))
})

export default router
