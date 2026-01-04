import { createFileRoute, Link } from "@tanstack/react-router"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { EditAccountForm, DeleteAccount } from "./-forms"

const MyAccount: FC = () => {
	return (
		<Page title="My Account" type="protected" mainSize="form">
			<Text tag="h1">Edit your account</Text>

			<EditAccountForm />

			<Text>
				<Link to="/my-account/edit-password">Edit your password.</Link>
			</Text>

			<DeleteAccount />
		</Page>
	)
}

export const Route = createFileRoute("/my-account/")({
	component: MyAccount,
})
