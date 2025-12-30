import app from "./app"
import { PORT } from "./utils"

app.listen(PORT, () => {
	console.log(`🚀 Server listening on port http://localhost:${PORT}`)
})
