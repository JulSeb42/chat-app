import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { passwordRegex } from "@julseb-lib/utils"
import { UserModel } from "models"
import { SALT_ROUNDS, TOKEN_SECRET, jwtConfig, SERVER_PATHS } from "utils"
import { COMMON_TEXTS } from "data"
import type { EditAccountFormData, EditPasswordFormData } from "types"

const router = Router()

const { USERS: PATHS } = SERVER_PATHS

router.get(PATHS.ALL_USERS, async (req, res, next) => {
	const { paginated, search, role } = req.query as {
		paginated: string
		page: string
		limit: string
		search?: string
		role?: string
	}

	if (paginated === "true") {
		const page = Number(req.query.page) || 1
		const limit = Number(req.query.limit) || 20
		const skip = (page - 1) * limit

		const query: any = {}

		if (search && search.trim() !== "") {
			query.fullName = { $regex: search.trim(), $options: "i" }
		}

		if (role && role !== "none") {
			query.role = role
		}

		const [users, total] = await Promise.all([
			UserModel.find(query).skip(skip).limit(limit),
			UserModel.countDocuments(query),
		])

		const hasMore = skip + limit < total

		return res.status(200).json({
			users,
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
			hasMore,
		})
	}

	return await UserModel.find()
		.then(usersFromDb => res.status(200).json(usersFromDb))
		.catch(err => next(err))
})

router.get(PATHS.GET_USER(), async (req, res, next) => {
	return await UserModel.findById(req.params.id)
		.then(userFromDb => res.status(200).json(userFromDb))
		.catch(err => {
			next(err)
			return res.status(400).json({
				message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST,
			})
		})
})

router.put(PATHS.EDIT_ACCOUNT(), async (req, res, next) => {
	const { fullName } = req.body as EditAccountFormData

	if (!fullName) {
		return res
			.status(400)
			.json({ message: COMMON_TEXTS.ERRORS.FULL_NAME_EMPTY })
	}

	return await UserModel.findByIdAndUpdate(
		req.params.id,
		{ ...req.body },
		{ new: true },
	)
		.then(updatedUser => {
			const payload = { user: updatedUser }
			const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig)

			return res.status(201).json({
				user: updatedUser,
				authToken: authToken,
			})
		})
		.catch(err => next(err))
})

router.put(PATHS.EDIT_PASSWORD(), async (req, res, next) => {
	const { oldPassword, newPassword } = req.body as EditPasswordFormData

	if (!passwordRegex.test(newPassword)) {
		return res.status(400).json({
			message: COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID,
		})
	}

	return await UserModel.findById(req.params.id)
		.then(async foundUser => {
			if (!foundUser) {
				return res
					.status(400)
					.json({ message: COMMON_TEXTS.ERRORS.USER_NOT_EXIST })
			}

			if (!(await bcrypt.compare(oldPassword, foundUser?.password))) {
				return res
					.status(400)
					.json({ message: COMMON_TEXTS.ERRORS.OLD_PASSWORD_WRONG })
			}

			const salt = bcrypt.genSaltSync(SALT_ROUNDS)
			const hashedPassword = bcrypt.hashSync(newPassword, salt)

			return await UserModel.findByIdAndUpdate(
				req.params.id,
				{ password: hashedPassword },
				{ new: true },
			).then(updatedUser => {
				const payload = { user: updatedUser }
				const authToken = jwt.sign(payload, TOKEN_SECRET, jwtConfig)

				return res.status(201).json({ user: updatedUser, authToken })
			})
		})
		.catch(err => next(err))
})

router.delete(PATHS.DELETE_ACCOUNT(), async (req, res, next) => {
	return await UserModel.findByIdAndDelete(req.params.id)
		.then(() =>
			res.status(200).json({ message: COMMON_TEXTS.USER_DELETED }),
		)
		.catch(err => next(err))
})

export default router
