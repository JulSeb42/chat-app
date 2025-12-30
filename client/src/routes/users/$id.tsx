import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { Page, UserHeader, ErrorMessage } from "components"
import { NotFoundPage } from "pages"
import { userService } from "api"
import type { User } from "types"

const User: FC = () => {
	const { id } = Route.useParams()

	const {
		data: user,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["user"],
		queryFn: async () => (await userService.getUser(id!)).data,
	})

	if (!user) return <NotFoundPage />

	return (
		<Page
			title={isPending ? "Loading..." : isError ? "500" : user.fullName}
			type="none"
			isLoading={isPending}
		>
			{isError ? (
				<ErrorMessage>{error.message}</ErrorMessage>
			) : (
				<UserHeader user={user} isPublic />
			)}
		</Page>
	)
}

export const Route = createFileRoute("/users/$id")({
	component: User,
})
