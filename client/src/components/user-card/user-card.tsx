import { Link } from "@tanstack/react-router"
import { Avatar, Text, LazyImage, getInitials, clsx } from "@julseb-lib/react"
import type { IUserCard } from "./types"

const UserCard: FC<IUserCard> = ({ user }) => {
	return (
		<Link
			to="/users/$id"
			params={{ id: user._id }}
			className={clsx(
				"flex flex-col items-center gap-2 p-2 border border-gray-200 rounded-lg",
				"hover:scale-105",
			)}
		>
			<Avatar>
				{user.avatar ? (
					<LazyImage
						src={user.avatar}
						alt={`Avatar ${user.fullName}`}
						className="w-full h-full"
						fit="cover"
						skeletonAnimation="shine"
						skeletonClasses="w-full h-full"
					/>
				) : (
					getInitials(user.fullName)
				)}
			</Avatar>

			<Text textAlign="center">{user.fullName}</Text>
		</Link>
	)
}

export default UserCard
