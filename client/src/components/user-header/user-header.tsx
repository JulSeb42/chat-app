import { Avatar, Text, LazyImage, clsx, getInitials } from "@julseb-lib/react"
import type { IUserHeader } from "./types"

const UserHeader: FC<IUserHeader> = ({ user, isPublic }) => {
	return (
		<div className={clsx("flex items-center gap-2", "user-header")}>
			<Avatar>
				{user?.avatar ? (
					<LazyImage
						src={user?.avatar}
						alt={`Avatar ${user?.fullName}`}
						skeletonAnimation="shine"
						skeletonClasses="w-full h-full"
					/>
				) : (
					getInitials(user?.fullName)
				)}
			</Avatar>

			<Text tag="h1">
				{!isPublic ? "Hello " : ""}
				{user?.fullName}
			</Text>
		</div>
	)
}

export default UserHeader
