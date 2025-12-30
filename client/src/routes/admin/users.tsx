import { useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { Text, Grid, Input, useDebounce } from "@julseb-lib/react"
import { AdminPage, ErrorMessage, Pagination, UserCardAdmin } from "components"
import { userService } from "api"

const Users: FC = () => {
	const { page } = Route.useLoaderDeps()
	const navigate = useNavigate()

	const [search, setSearch] = useState("")
	const [role, setRole] = useState("none")
	const debouncedSearch = useDebounce(search, 500)

	const {
		data: paginatedResponse,
		error,
		isError,
		isPending,
	} = useQuery({
		queryKey: ["users", page, debouncedSearch, role],
		queryFn: () =>
			userService.allUsers(page ?? 1, 20, debouncedSearch, role),
	})

	const users = paginatedResponse?.data.users ?? []

	return (
		<AdminPage title="Users" isLoading={isPending}>
			<Text tag="h1">Users</Text>

			<Grid cols={2} gap="sm">
				<Input
					label="Search by name"
					id="search"
					value={search}
					onChange={e => {
						setSearch(e.target.value)
						navigate({ to: "/admin/users", search: { page: 1 } })
					}}
				/>

				<Input
					label="Filter by role"
					id="role"
					type="select"
					value={role}
					onChange={e => {
						setRole(e.target.value)
						navigate({ to: "/admin/users", search: { page: 1 } })
					}}
				>
					<option value="none">None</option>
					<option value="user">User</option>
					<option value="admin">Admin</option>
				</Input>
			</Grid>

			{isError ? (
				<ErrorMessage>{error.message}</ErrorMessage>
			) : users?.length ? (
				<Grid cols={4} gap="sm">
					{users?.map(user => (
						<UserCardAdmin user={user} key={user._id} />
					))}
				</Grid>
			) : (
				<Text>No user yet.</Text>
			)}

			<Pagination
				totalPages={paginatedResponse?.data.totalPages ?? 1}
				currentPage={Number(page)}
				navigateFrom="/admin/users"
			/>
		</AdminPage>
	)
}

export const Route = createFileRoute("/admin/users")({
	component: Users,
	validateSearch: (search: Record<string, unknown>): UsersPages => {
		return { page: Number(search.page ?? 1) }
	},
	loaderDeps: ({ search: { page } }) => ({ page }),
})

type UsersPages = {
	page?: number | null
}
