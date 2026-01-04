import { Link } from "@tanstack/react-router"
import { Text } from "@julseb-lib/react"
import { Page } from "components"

export const NotFoundPage = () => {
	return (
		<Page title="404" type="all">
			<Text tag="h1">Page not found!</Text>

			<Text>
				The page you're looking for does not exist.{" "}
				<Link to="/">Back to homepage.</Link>
			</Text>
		</Page>
	)
}
