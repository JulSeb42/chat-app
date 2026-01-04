import {
	Flexbox,
	Linkify,
	Skeleton,
	SkeletonCard,
	clsx,
} from "@julseb-lib/react"
import { Avatar } from "./avatar"
import { useAuth } from "context"
import type { Message as MessageType } from "types"

export const Message: FC<IMessage> = ({ message }) => {
	const { user } = useAuth()

	return (
		<Flexbox
			className="w-full"
			justifyContent="end"
			alignItems="end"
			gap="xs"
			flexDirection={
				message.sender._id === user?._id ? "row" : "row-reverse"
			}
		>
			<Linkify
				className={clsx(
					"px-4 py-2 rounded-md max-w-[60%]",
					message.sender._id === user?._id
						? "bg-primary-500 text-white"
						: "bg-gray-200",
				)}
			>
				{message.body}
			</Linkify>

			<Avatar user={message.sender} className="size-8 text-xs" />
		</Flexbox>
	)
}

interface IMessage {
	message: MessageType
}

export const MessageSkeleton: FC<IMessageSkeleton> = ({ type }) => {
	return (
		<SkeletonCard
			className="w-full"
			justifyContent="end"
			alignItems="end"
			gap="xs"
			flexDirection={type === "sender" ? "row" : "row-reverse"}
			isShiny
		>
			<Skeleton className="rounded-md w-[40%] h-10" />
			<Skeleton className="rounded-full size-8" />
		</SkeletonCard>
	)
}

interface IMessageSkeleton {
	type: "sender" | "receiver"
}
