import type { FileRouteTypes } from "routeTree.gen"

export interface IPagination {
	totalPages: number
	currentPage: number
	navigateFrom: FileRouteTypes["fullPaths"]
}
