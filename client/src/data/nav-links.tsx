import { BiLayout, BiLinkExternal, BiUser, BiUserCircle } from "react-icons/bi"
import type { LinkType } from "types"
import type { FileRouteTypes } from "routeTree.gen"

type NavLink = {
	text: string
	to: FileRouteTypes["fullPaths"]
	type: LinkType
}

export const navLinks: Array<NavLink> = [
	{ text: "Homepage", to: "/", type: "none" },
	{ text: "Users", to: "/users", type: "none" },
	{ text: "Signup", to: "/signup", type: "anon" },
	{ text: "Login", to: "/login", type: "anon" },
	{ text: "My account", to: "/my-account", type: "protected" },
	{ text: "Admin", to: "/admin", type: "admin" },
]

type AdminNavLink = Omit<NavLink, "type"> & {
	icon: ReactElement
}

export const adminNavLinks: Array<AdminNavLink> = [
	{ text: "Admin", to: "/admin", icon: <BiLayout /> },
	{ text: "Users", to: "/admin/users", icon: <BiUser /> },
]

export const adminNavBottomLinks: Array<AdminNavLink> = [
	{ text: "My account", to: "/admin/edit-account", icon: <BiUserCircle /> },
	{ text: "Back to site", to: "/", icon: <BiLinkExternal /> },
]
