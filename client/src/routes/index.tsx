import { createFileRoute } from "@tanstack/react-router"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { useAuth } from "context"

const App: FC = () => {
	const { isLoggedIn, isLoading, user } = useAuth()

	return (
		<Page title="Homepage" isLoading={isLoading} type="none">
			<Text tag="h1">Hello World</Text>

			{isLoggedIn && (
				<Text>Hello {user?.fullName}, you are logged in!</Text>
			)}
		</Page>
	)
}

export const Route = createFileRoute("/")({
	component: App,
})
