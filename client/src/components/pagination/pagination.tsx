import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import {
	clsx,
	Pagination as Container,
	PaginationButton,
} from "@julseb-lib/react"
import type { IPagination } from "./types"

const Pagination: FC<IPagination> = ({
	totalPages,
	currentPage,
	navigateFrom,
}) => {
	const navigate = useNavigate({ from: navigateFrom })

	const [page, setPage] = useState(currentPage)

	const handlePrev = () => {
		setPage(page - 1)
		navigate({ search: { page: page - 1 } })
	}

	const handlePage = (page: number) => {
		setPage(page)
		navigate({ search: { page } })
	}

	const handleNext = () => {
		setPage(page + 1)
		navigate({ search: { page: page + 1 } })
	}

	const getPaginationGroup = () => {
		const start = Math.floor((currentPage! - 1) / 5) * 5

		return new Array(5)
			.fill(totalPages)
			.map((_, i) => start + i + 1)
			.filter(item => item <= (totalPages || 0))
	}

	const paginationGroup = getPaginationGroup()

	if (totalPages <= 1) return null

	return (
		<Container className={clsx("", "pagination")}>
			<PaginationButton
				onClick={handlePrev}
				isActive={false}
				disabled={currentPage === 1}
			>
				<BiLeftArrowAlt size={24} />
			</PaginationButton>

			{paginationGroup[0] !== 1 && (
				<>
					<PaginationButton
						isActive={currentPage === 1}
						onClick={() => handlePage(1)}
					>
						1
					</PaginationButton>

					<PaginationButton readOnly>...</PaginationButton>
				</>
			)}

			{paginationGroup.map(n => (
				<PaginationButton
					isActive={n === currentPage}
					onClick={() => handlePage(n)}
					key={n}
				>
					{n}
				</PaginationButton>
			))}

			{paginationGroup[paginationGroup.length - 1] !== totalPages && (
				<>
					<PaginationButton readOnly>...</PaginationButton>

					<PaginationButton
						isActive={currentPage === totalPages}
						onClick={() => handlePage(totalPages)}
					>
						{totalPages}
					</PaginationButton>
				</>
			)}

			<PaginationButton
				onClick={handleNext}
				isActive={false}
				disabled={currentPage === totalPages}
			>
				<BiRightArrowAlt size={24} />
			</PaginationButton>
		</Container>
	)
}

export default Pagination
