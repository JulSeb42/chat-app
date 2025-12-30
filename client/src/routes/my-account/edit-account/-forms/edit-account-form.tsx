import { useState, useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import { toast, Form, Input } from "@julseb-lib/react"
import { ImageUploader, ErrorMessage } from "components"
import { userService } from "api"
import { useAuth } from "context"
import { COMMON_TEXTS } from "data"
import type { LibValidationStatus } from "@julseb-lib/react/types"

export const EditAccountForm: FC = () => {
	const navigate = useNavigate()
	const { user, setUser, setToken } = useAuth()

	const [inputs, setInputs] = useState({
		fullName: user?.fullName ?? "",
	})
	const [avatar, setAvatar] = useState(user?.avatar ?? "")
	const [validation, setValidation] = useState<{
		fullName: LibValidationStatus
	}>({
		fullName: undefined,
	})
	const [errorMessage, setErrorMessage] = useState(undefined)
	const [isLoading, setIsLoading] = useState(true)
	const [isUploading, setIsUploading] = useState(false)

	useEffect(() => {
		if (user) {
			setInputs({ fullName: user.fullName })
			setAvatar(user.avatar ?? "")
			setIsLoading(false)
		}
	}, [user])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target

		setInputs({ ...inputs, [id]: value })

		if (validation.fullName) {
			setValidation({
				fullName: value.length ? false : true,
			})
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)

		if (!inputs.fullName?.length) {
			setValidation({
				...validation,
				fullName: !inputs.fullName?.length ? false : undefined,
			})
			return
		}

		userService
			.editAccount(user!._id, {
				...inputs,
				avatar,
			})
			.then(res => {
				setUser(res.data.user)
				setToken(res.data.authToken)
				toast.success("Your changes have been saved!")
			})
			.then(() => setTimeout(() => navigate({ to: "/my-account" }), 300))
			.catch(err => setErrorMessage(err.response.data.message))
			.finally(() => setIsLoading(false))
	}

	return (
		<>
			<Form
				buttonPrimary="Save changes"
				buttonSecondary={{
					content: "Cancel",
					onClick: () => navigate({ to: "/my-account" }),
				}}
				onSubmit={handleSubmit}
				isLoading={isLoading || isUploading}
			>
				<Input
					id="fullName"
					label="Full name"
					value={inputs.fullName}
					onChange={handleChange}
					validation={{
						status: validation.fullName,
						message: COMMON_TEXTS.ERRORS.FULL_NAME_EMPTY,
					}}
				/>

				<Input
					id="email"
					label="Email"
					value={user?.email}
					disabled
					aria-disabled
					helperBottom="You can not edit your email."
				/>

				<ImageUploader
					id="avatar"
					image={avatar}
					setImage={setAvatar}
					isUploading={isUploading}
					setIsUploading={setIsUploading}
					label="Avatar"
				/>
			</Form>

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}
