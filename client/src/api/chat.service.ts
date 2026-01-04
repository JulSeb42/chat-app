import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type {
	ApiResponse,
	Chat,
	NewChatFormData,
	NewMessageFormData,
	ReadMessageFormData,
} from "types"

type PATHS = keyof typeof SERVER_PATHS.CHAT

const generateRoute = (route: Exclude<PATHS, "ROOT">, id?: string) =>
	generateServerRoute("CHAT", route, id)

class ChatService {
	allChats = async (): ApiResponse<Array<Chat>> =>
		await http.get(generateRoute("ALL_CHATS"))

	getChat = async (id: string): ApiResponse<Chat> =>
		await http.get(generateRoute("GET_CHAT", id))

	existingChat = async (user1: string, user2: string): ApiResponse<Chat> =>
		await http.get(
			`${generateRoute("EXISTING_CHAT")}?user1=${user1}&user2=${user2}`,
		)

	newChat = async (data: NewChatFormData): ApiResponse<Chat> =>
		await http.post(generateRoute("NEW_CHAT"), data)

	newMessage = async (
		id: string,
		data: NewMessageFormData,
	): ApiResponse<Chat> =>
		await http.put(generateRoute("NEW_MESSAGE", id), data)

	markRead = async (
		id: string,
		data: ReadMessageFormData,
	): ApiResponse<Chat> => await http.put(generateRoute("MARK_READ", id), data)
}

export const chatService = new ChatService()
