import {
	Avatar as Container,
	LazyImage,
	clsx,
	getInitials,
} from "@julseb-lib/react"
import type { User } from "types"

export const Avatar: FC<IAvatar> = ({ user, className }) => {
	return (
		<Container className={clsx(className)}>
			{user.avatar ? (
				<LazyImage src={user.avatar} alt={`Avatar ${user.fullName}`} />
			) : (
				getInitials(user.fullName)
			)}
		</Container>
	)
}

interface IAvatar {
	user: User
	className?: string
}
