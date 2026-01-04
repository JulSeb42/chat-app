import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { Text, Flexbox, Button } from "@julseb-lib/react"
import { Page, ChatCard } from "components"
import { useAuth } from "context"
import { userService } from "api"

const App: FC = () => {
	const { isLoading, user } = useAuth()

	const { data: userData } = useQuery({
		queryKey: ["user", user?._id],
		queryFn: () => userService.getUser(user!._id).then(res => res.data),
		enabled: !!user?._id,
		staleTime: 30000, // 30 seconds
	})

	const currentUser = userData || user
	const filteredChats =
		currentUser?.chats?.filter(chat => chat.messages.length > 0) || []

	return (
		<Page title="Homepage" isLoading={isLoading} type="protected">
			<Flexbox justifyContent="space-between" alignItems="center">
				<Text tag="h1">All my chats</Text>
				<Button
					className="self-center"
					element={Link}
					// @ts-ignore
					to="/new-chat"
				>
					New chat
				</Button>
			</Flexbox>

			<Flexbox flexDirection="col" gap="md">
				{filteredChats && filteredChats?.length ? (
					filteredChats.map(chat => (
						<ChatCard chat={chat} key={chat._id} />
					))
				) : (
					<Text>No chat yet.</Text>
				)}
			</Flexbox>
		</Page>
	)
}

export const Route = createFileRoute("/")({
	component: App,
})
