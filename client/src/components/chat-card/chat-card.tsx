import { Link } from "@tanstack/react-router"
import { Flexbox, Text, clsx, convertDateShort } from "@julseb-lib/react"
import { Avatar } from "components/avatar"
import { useAuth } from "context"
import type { IChatCard } from "./types"

export const ChatCard: FC<IChatCard> = ({ chat }) => {
	const { user } = useAuth()

	const otherUser =
		chat.users[0]._id === user?._id ? chat.users[1] : chat.users[0]

	const lastMessage = chat.messages[chat.messages.length - 1]

	return (
		<Link
			to="/$id"
			params={{ id: chat._id }}
			className={clsx(
				"flex flex-col gap-2 p-6 border border-gray-200 rounded-2xl",
				"chat-card",
			)}
		>
			<Flexbox alignItems="start" gap="xs">
				<Flexbox
					inline
					alignItems="center"
					className="h-8 -translate-y-px"
				>
					<Avatar user={otherUser} className="size-6 text-sm" />
				</Flexbox>

				<Text tag="h5">{otherUser.fullName}</Text>
			</Flexbox>

			<Text>{lastMessage.body}</Text>

			<Text tag="small" color="gray">
				{convertDateShort(lastMessage.createdAt ?? "")}
			</Text>
		</Link>
	)
}
