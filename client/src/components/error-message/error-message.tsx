import { Alert } from "@julseb-lib/react"
import type { IErrorMessage } from "./types"

const ErrorMessage: FC<IErrorMessage> = ({ children }) => {
	if (!children) return null

	return <Alert color="danger">{children.toString()}</Alert>
}

export default ErrorMessage
