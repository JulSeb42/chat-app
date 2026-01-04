import type { LinkType } from "types"
import type { FileRouteTypes } from "routeTree.gen"

type NavLink = {
	text: string
	to: FileRouteTypes["fullPaths"]
	type: LinkType
}

export const navLinks: Array<NavLink> = [
	{ text: "Homepage", to: "/", type: "protected" },
	{ text: "Signup", to: "/signup", type: "anon" },
	{ text: "Login", to: "/login", type: "anon" },
	{ text: "My account", to: "/my-account", type: "protected" },
]
