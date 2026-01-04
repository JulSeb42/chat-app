import { useState, useEffect, useRef } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { Flexbox, Hr, Text, toast } from "@julseb-lib/react"
import { Page, ErrorMessage, Message, MessageSkeleton } from "components"
import { SendMessage, ScrollBottom } from "./-chat"
import { NotFoundPage } from "pages"
import { chatService } from "api"
import { useAuth } from "context"
import type { Chat } from "types"

const Chat: FC = () => {
	const { id } = Route.useParams()
	const { user } = useAuth()

	// Get chat
	const { data, isPending, error } = useQuery({
		queryKey: ["chat"],
		queryFn: () => chatService.getChat(id).then(res => res.data),
	})

	const [chat, setChat] = useState(data)
	const [messages, setMessages] = useState(chat?.messages ?? [])

	useEffect(() => {
		if (data && user)
			chatService
				.markRead(data._id, { user: user._id })
				.then(res => setChat(res.data))
				.catch(err => {
					console.error(err)
					toast.error("An error occurred while reading messages")
				})
	}, [data, user])

	useEffect(() => {
		if (data) setMessages(data.messages)
	}, [data])

	// Scroll to bottom on page load
	const containerRef = useRef<HTMLDivElement>(null as any)
	const endRef = useRef<HTMLSpanElement>(null as any)

	useEffect(() => {
		if (endRef.current) {
			endRef.current.scrollTop = endRef.current.scrollHeight
		}
	}, [])

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight
		}
	}, [messages])

	if (!isPending && !data && !chat) return <NotFoundPage />

	return (
		<Page title="Chat" type="protected">
			<Text tag="h1">Chat</Text>

			<Flexbox
				flexDirection="col"
				gap="xs"
				className="p-4 border border-gray-200 rounded-2xl h-[calc(100svh-56px-96px-60px-24px)]"
			>
				<Flexbox
					flexDirection="col"
					gap="sm"
					className="relative size-full overflow-y-scroll grow"
					ref={containerRef}
				>
					{isPending ? (
						<>
							<MessageSkeleton type="sender" />
							<MessageSkeleton type="receiver" />
							<MessageSkeleton type="sender" />
							<MessageSkeleton type="receiver" />
						</>
					) : error ? (
						<ErrorMessage>{error.message}</ErrorMessage>
					) : (
						<>
							<Flexbox
								flexDirection="col"
								gap="sm"
								className="relative size-full overflow-y-scroll grow"
								ref={containerRef}
								justifyContent={
									!messages.length && !isPending
										? "center"
										: "start"
								}
								alignItems={
									!messages.length && !isPending
										? "center"
										: "start"
								}
							>
								{messages.length ? (
									messages.map(message => (
										<Message
											message={message}
											key={message._id}
										/>
									))
								) : (
									<Text color="gray-500">
										No message yet.
									</Text>
								)}
							</Flexbox>

							<ScrollBottom
								containerRef={containerRef}
								messages={messages}
							/>

							<span ref={endRef} />
						</>
					)}
				</Flexbox>

				<Hr />

				<SendMessage chat={chat!} setMessages={setMessages} />
			</Flexbox>
		</Page>
	)
}

export const Route = createFileRoute("/$id")({
	component: Chat,
})
