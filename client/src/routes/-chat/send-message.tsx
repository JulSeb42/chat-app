import { useEffect, useState, type KeyboardEvent } from "react"
import { BiSend } from "react-icons/bi"
import { useQueryClient } from "@tanstack/react-query"
import { ButtonIcon, toast } from "@julseb-lib/react"
import { useAuth } from "context"
import { chatService } from "api"
import { socket } from "utils"
import type { Chat, Message } from "types"

export const SendMessage: FC<ISendMessage> = ({ chat, setMessages }) => {
	const { user, refreshUser } = useAuth()
	const queryClient = useQueryClient()

	const [message, setMessage] = useState("")

	useEffect(() => {
		const handleChatMessage = (message: Message & { sender?: string }) => {
			if (message.sender && message.sender !== user?._id) {
				setMessages(prev => {
					const messageExists = prev.find(m => m._id === message._id)

					if (messageExists) {
						return prev
					}
					return [...prev, message]
				})
			}
		}

		socket.off("chat message")
		socket.on("chat message", handleChatMessage)

		return () => {
			socket.off("chat message", handleChatMessage)
		}
	}, [user?._id])

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		if (!user || !chat || !message.length) return

		chatService
			.newMessage(chat._id, { body: message, sender: user._id as any })
			.then(res => {
				setMessages(res.data.messages)
				setMessage("")

				queryClient.invalidateQueries({ queryKey: ["user", user._id] })
				refreshUser()

				const lastMessage =
					res.data.messages[res.data.messages.length - 1]
				if (lastMessage) {
					socket.emit("chat message", {
						...lastMessage,
						conversationId: chat._id,
						sender: user._id,
					})
				}
			})
			.catch(err => {
				console.error(err)
				toast.error("An error occurred")
			})
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSubmit(e as any)
		}
	}

	return (
		<form className="flex items-end gap-2" onSubmit={handleSubmit}>
			<textarea
				placeholder="Type your message..."
				className="focus:bg-primary-50 px-2 py-1 rounded-md outline-none max-h-40 field-sizing-content resize-none grow"
				value={message}
				onChange={e => setMessage(e.target.value)}
				onKeyDown={handleKeyDown}
			/>

			<ButtonIcon
				icon={<BiSend />}
				className="size-6 transition-opacity -translate-y-1 duration-200"
				variant="transparent"
				type="submit"
			/>
		</form>
	)
}

interface ISendMessage {
	chat: Chat
	setMessages: DispatchState<Array<Message>>
}
