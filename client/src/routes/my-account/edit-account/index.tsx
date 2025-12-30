import { createFileRoute, Link, Navigate } from "@tanstack/react-router"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { EditAccountForm, DeleteAccount } from "./-forms"
import { useAuth } from "context"

const EditAccount: FC = () => {
	const { user } = useAuth()

	if (user?.role === "admin") return <Navigate to="/admin/edit-account" />

	return (
		<Page title="Edit your account" type="protected" mainSize="form">
			<Text tag="h1">Edit your account</Text>

			<EditAccountForm />

			<Text>
				<Link to="/my-account/edit-account/edit-password">
					Edit your password.
				</Link>
			</Text>

			<DeleteAccount />
		</Page>
	)
}

export const Route = createFileRoute("/my-account/edit-account/")({
	component: EditAccount,
})
