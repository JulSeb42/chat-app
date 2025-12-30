import { Meta, PageLoading, Main, clsx } from "@julseb-lib/react"
import { AdminRoute } from "components/routes/admin-route"
import { AdminNav } from "./admin-nav"
import type { IAdminPage } from "./types"

const AdminPage: FC<IAdminPage> = ({
	title,
	children,
	isLoading,
	mainSize = "default",
}) => {
	return (
		<AdminRoute>
			<Meta title={title} />

			{isLoading ? (
				<PageLoading />
			) : (
				<section
					className={clsx("pl-(--admin-nav-width)", "admin-page")}
				>
					<AdminNav />

					<Main
						className="mx-auto py-12 w-[calc(100%-var(--admin-nav-width))]"
						size={mainSize}
					>
						{children}
					</Main>
				</section>
			)}
		</AdminRoute>
	)
}

export default AdminPage
