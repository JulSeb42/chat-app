import { clsx, SkeletonCard, Skeleton } from "@julseb-lib/react"

const UserCardSkeleton: FC = () => {
	return (
		<SkeletonCard
			className={clsx(
				"flex flex-col items-center gap-2 p-2 border border-gray-200 rounded-lg",
			)}
			isShiny
		>
			<Skeleton className={clsx("rounded-full size-12")} />
			<Skeleton className={clsx("rounded-md w-[70%] h-6")} />
		</SkeletonCard>
	)
}

export default UserCardSkeleton
