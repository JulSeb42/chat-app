import { useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Text, Input, clsx, toast } from "@julseb-lib/react"
import { Page } from "components"
import { useAuth } from "context"
import { userService, chatService } from "api"
import type { User } from "types"

const NewChat: FC = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { user: currentUser, refreshUser } = useAuth()

	const { data } = useQuery({
		queryKey: ["users"],
		queryFn: () => userService.allUsers().then(res => res.data),
	})

	const users: Array<User> = data as unknown as Array<User>

	const [search, setSearch] = useState("")
	const [isOpen, setIsOpen] = useState(false)

	const filteredUsers = users
		?.filter(user =>
			user.fullName.toLowerCase().includes(search.toLowerCase()),
		)
		.filter(user => user._id !== currentUser?._id)

	const handleUserSelect = async (user: User) => {
		if (!currentUser) {
			console.error("No current user found")
			toast.error("No current user found")
			return
		}

		chatService
			.existingChat(currentUser._id, user._id)
			.then(existingChatResponse => {
				navigate({
					to: "/$id",
					params: { id: existingChatResponse.data._id },
				})
			})
			.catch(() => {
				chatService
					.newChat({
						users: [currentUser._id, user._id],
					})
					.then(newChatResponse => {
						// Invalidate user query to refresh chats list
						queryClient.invalidateQueries({
							queryKey: ["user", currentUser._id],
						})
						refreshUser()

						navigate({
							to: "/$id",
							params: { id: newChatResponse.data._id },
						})
					})
					.catch(err => {
						console.error(err)
						toast.error("An error occurred")
					})
			})
	}

	return (
		<Page title="New Chat" type="protected">
			<Text tag="h1">New Chat</Text>

			<div className="relative">
				<Input
					placeholder="Search a user's name"
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="z-10 relative"
					onFocus={() => setIsOpen(true)}
					onBlur={() => setTimeout(() => setIsOpen(false), 200)}
				/>

				<div
					className={clsx(
						"top-0 z-0 absolute flex flex-col pt-8 border border-gray-200 rounded-md w-full overflow-y-scroll",
						isOpen
							? "max-h-100 pt-8 opacity-100"
							: "max-h-0 pt-0 opacity-0",
					)}
				>
					{filteredUsers?.map(user => (
						<button
							key={user._id}
							className="hover:bg-primary-300 px-2 py-1 text-left"
							onClick={() => {
								setSearch(user.fullName)
								setIsOpen(false)
								handleUserSelect(user)
							}}
						>
							{user.fullName}
						</button>
					))}
				</div>
			</div>
		</Page>
	)
}

export const Route = createFileRoute("/new-chat")({
	component: NewChat,
})
