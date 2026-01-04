import { createFileRoute } from "@tanstack/react-router"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { EditPasswordForm } from "./-forms/edit-password-form"

const EditPassword: FC = () => {
	return (
		<Page title="Edit Password" type="protected" mainSize="form">
			<Text tag="h1">Edit Password</Text>

			<EditPasswordForm />
		</Page>
	)
}

export const Route = createFileRoute("/my-account/edit-password")({
	component: EditPassword,
})
