import { useState, useRef, useCallback, useEffect } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Text } from "@julseb-lib/react"
import { Page, ErrorMessage, UserCard, UserCardSkeleton } from "components"
import { userService } from "api"

const Users: FC = () => {
	const {
		data,
		error,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isPending,
	} = useInfiniteQuery({
		queryKey: ["users"],
		queryFn: async ({ pageParam = 1 }) =>
			await userService.allUsers(pageParam),
		getNextPageParam: (lastPage, allPages) =>
			lastPage.data.hasMore ? allPages.length + 1 : undefined,
		initialPageParam: 1,
	})
	const [showLoading, setShowLoading] = useState(false)

	const loaderRef = useRef<HTMLSpanElement>(null as any)
	const handleObserver = useCallback(
		(entries: Array<IntersectionObserverEntry>) => {
			const target = entries[0]
			if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
				setShowLoading(true)
				fetchNextPage().finally(() => setShowLoading(false))
			}
		},
		[fetchNextPage, hasNextPage, isFetchingNextPage],
	)

	useEffect(() => {
		const option = { root: null, rootMargin: "20px", threshold: 0.1 }
		const observer = new IntersectionObserver(handleObserver, option)
		if (loaderRef.current) observer.observe(loaderRef.current)
		return () => observer.disconnect()
	}, [handleObserver])

	const users = data?.pages.flatMap(page => page.data.users) ?? []

	return (
		<Page title="Users" isLoading={isPending} type="none">
			<Text tag="h1">Users</Text>

			{isError ? (
				<ErrorMessage>{error.message}</ErrorMessage>
			) : users.length ? (
				<div className="gap-4 grid grid-cols-4">
					{users.map(user => (
						<UserCard user={user} key={user._id} />
					))}
				</div>
			) : (
				<Text>No user yet.</Text>
			)}

			{(showLoading || isFetchingNextPage) && hasNextPage && (
				<div className="gap-4 grid grid-cols-4">
					<UserCardSkeleton />
					<UserCardSkeleton />
				</div>
			)}

			<span ref={loaderRef} style={{ display: "hidden", height: 1 }} />
		</Page>
	)
}

export const Route = createFileRoute("/users/")({
	component: Users,
})
