import { useState } from "react"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import {
	Text,
	Form,
	Input,
	passwordRegex,
	emailRegex,
	toast,
	InputCheck,
} from "@julseb-lib/react"
import { Page, ErrorMessage } from "components"
import { authService } from "api"
import { COMMON_TEXTS } from "data"
import { useAuth } from "context"
import type { LibValidationStatus } from "@julseb-lib/react/types"
import type { IErrorMessage } from "types"

const Signup: FC = () => {
	const { loginUser } = useAuth()
	const navigate = useNavigate()

	const [inputs, setInputs] = useState({
		fullName: "",
		email: "",
		password: "",
	})
	const [saveEmail, setSaveEmail] = useState(true)
	const [validation, setValidation] = useState<{
		fullName: LibValidationStatus
		email: LibValidationStatus
		password: LibValidationStatus
	}>({
		fullName: undefined,
		email: undefined,
		password: undefined,
	})
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target

		setInputs({ ...inputs, [id]: value })

		if (
			validation.fullName !== undefined ||
			validation.email !== undefined ||
			validation.password !== undefined
		) {
			if (id === "fullName" && validation.fullName !== undefined) {
				if (value.length) {
					setValidation({ ...validation, fullName: true })
				} else setValidation({ ...validation, fullName: false })
			}

			if (id === "email" && validation.email !== undefined) {
				if (emailRegex.test(value))
					setValidation({ ...validation, email: true })
				else setValidation({ ...validation, email: false })
			}

			if (id === "password" && validation.password !== undefined) {
				if (passwordRegex.test(value))
					setValidation({ ...validation, password: true })
				else setValidation({ ...validation, password: false })
			}
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		if (
			!inputs.fullName.length ||
			!emailRegex.test(inputs.email) ||
			!passwordRegex.test(inputs.password)
		) {
			setValidation({
				fullName: !inputs.fullName.length ? false : undefined,
				email: !emailRegex.test(inputs.email) ? false : undefined,
				password: !passwordRegex.test(inputs.password)
					? false
					: undefined,
			})
			setIsLoading(false)
			return
		}

		if (saveEmail) localStorage.setItem("email", inputs.email)

		authService
			.signup(inputs)
			.then(res => {
				loginUser(res.data.authToken)
				toast.success("Your account has been created!")
			})
			.then(() => setTimeout(() => navigate({ to: "/thank-you" }), 300))
			.catch(err => setErrorMessage(err.response.data.message))
			.finally(() => setIsLoading(false))
	}

	return (
		<Page title="Signup" type="anon" mainSize="form">
			<Text tag="h1">Signup</Text>

			<Form
				buttonPrimary="Create your account"
				onSubmit={handleSubmit}
				isLoading={isLoading}
			>
				<Input
					label="Full name"
					id="fullName"
					value={inputs.fullName}
					onChange={handleChange}
					validation={{
						status: validation.fullName,
						message: COMMON_TEXTS.ERRORS.FULL_NAME_EMPTY,
					}}
				/>

				<Input
					label="Email"
					id="email"
					type="email"
					value={inputs.email}
					onChange={handleChange}
					validation={{
						status: validation.email,
						message: COMMON_TEXTS.ERRORS.EMAIL_NOT_VALID,
					}}
				/>

				<Input
					label="Password"
					id="password"
					type="password"
					value={inputs.password}
					onChange={handleChange}
					validation={{
						status: validation.password,
						message: COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID,
					}}
				/>

				<InputCheck
					id="save"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setSaveEmail(e.target.checked)
					}
					variant="toggle"
					checked={saveEmail}
				>
					Save your email for faster login?
				</InputCheck>
			</Form>

			<ErrorMessage>{errorMessage}</ErrorMessage>

			<Text>
				You already have an account? <Link to="/login">Log in.</Link>
			</Text>
		</Page>
	)
}

export const Route = createFileRoute("/(auth)/signup")({
	component: Signup,
})
