import http from "http"
import { Server } from "socket.io"
import app from "app"
import { PORT, ORIGIN } from "utils"

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: ORIGIN } })

io.on("connection", socket => {
	console.log(`A user connected: ${socket.id}`)

	socket.on("chat message", async msg => {
		console.log("Socket received message for real-time broadcast:", msg)
		socket.broadcast.emit("chat message", msg)
	})

	socket.on("disconnect", () =>
		console.log(`User disconnected: ${socket.id}`),
	)
})

server.listen(PORT, () =>
	console.log(
		`🚀 Server and Socket.io listening on port http://localhost:${PORT}`,
	),
)
