import { Fragment } from "react"
import { Link } from "@tanstack/react-router"
import { BiMoon, BiSun } from "react-icons/bi"
import {
	PageLayout,
	clsx,
	Meta,
	PageLoading,
	ButtonIcon,
	useLibTheme,
} from "@julseb-lib/react"
import { navLinks, SITE_DATA } from "data"
import { useAuth, useModalOpen } from "context"
import { ProtectedRoute } from "components/routes/protected-route"
import { AnonRoute } from "components/routes/anon-route"
import { AdminRoute } from "components/routes/admin-route"
import type { ILibPageLayout } from "@julseb-lib/react/component-props"
import type { LinkType } from "types"
import type { LibMainSize } from "@julseb-lib/react/types"

const Page: FC<IPage> = ({
	title,
	description,
	keywords = [],
	cover,
	children,
	noWrapper,
	noMain,
	isLoading,
	mainSize,
	type,
	...rest
}) => {
	const { hasModalOpen } = useModalOpen()

	const Element =
		type === "anon"
			? AnonRoute
			: type === "admin"
				? AdminRoute
				: type === "protected"
					? ProtectedRoute
					: Fragment

	const pageTitle = `${title} | ${SITE_DATA.NAME}`

	if (isLoading) {
		return (
			<>
				<Meta title={pageTitle} />
				<PageLoading />
			</>
		)
	}

	return (
		<Element>
			<PageLayout
				meta={{
					title: pageTitle,
					description: description ?? SITE_DATA.DESCRIPTION,
					keywords: [...keywords, ...SITE_DATA.KEYWORDS],
					cover: cover ?? SITE_DATA.COVER,
					favicon: SITE_DATA.FAVICON,
					siteName: SITE_DATA.NAME,
					author: SITE_DATA.AUTHOR,
					authorUrl: SITE_DATA.AUTHOR_URL,
					language: SITE_DATA.LANGUAGE,
					type: SITE_DATA.TYPE as any,
					url: SITE_DATA.URL,
					generator: SITE_DATA.GENERATOR,
					publisher: SITE_DATA.AUTHOR,
					email: SITE_DATA.EMAIL,
					creator: SITE_DATA.AUTHOR,
					manifest: SITE_DATA.MANIFEST,
					category: SITE_DATA.CATEGORY,
					twitterCard: SITE_DATA.TWITTER_CARD as any,
					appleTouchIcon: "/logo192.png",
					themeColor: "#3B82F6",
				}}
				header={{
					logo: <Link to="/">{SITE_DATA.NAME}</Link>,
					nav: <Nav />,
					position: "absolute",
					className: clsx(
						"md:[&_nav]:relative md:[&_nav]:flex-row [&_nav]:flex-col [&_nav]:w-[70%] md:[&_nav]:w-fit md:[&_.header-burger]:hidden!",
						hasModalOpen ? "z-10" : "z-20",
					),
				}}
				noMain={noMain as any}
				noWrapper={noWrapper as any}
				wrapperProps={{
					className: clsx(
						"flex-row mt-[56px] pt-8 pb-12 min-h-[calc(100svh-56px)]",
					),
					...rest.wrapperProps,
				}}
				mainProps={{ className: "py-0", size: mainSize }}
				{...rest}
			>
				{children}
			</PageLayout>
		</Element>
	)
}

type IPage = ILibPageLayout & {
	title: string
	description?: string
	keywords?: Array<string>
	cover?: string
	isLoading?: boolean
	type: LinkType
	mainSize?: LibMainSize
}

export default Page

const Nav: FC = () => {
	const { theme, switchTheme } = useLibTheme()
	const { isLoggedIn, user, logoutUser } = useAuth()

	const links = navLinks.filter(link =>
		isLoggedIn && user?.role === "user"
			? link.type === "protected" || link.type === "none"
			: isLoggedIn && user?.role === "admin"
				? link.type === "admin" || link.type === "none"
				: link.type === "anon" || link.type === "none",
	)

	return (
		<>
			{links.map((link, i) => (
				<Link to={link.to} key={i}>
					{link.text}
				</Link>
			))}

			{isLoggedIn && (
				<button onClick={logoutUser} className="text-left">
					Logout
				</button>
			)}

			<ButtonIcon
				icon={theme === "dark" ? <BiSun /> : <BiMoon />}
				onClick={switchTheme}
				className="focus:ring-0 size-6"
				variant="transparent"
				color="white"
			/>
		</>
	)
}
