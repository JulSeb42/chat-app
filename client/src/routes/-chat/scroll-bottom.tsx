import { useEffect, useState } from "react"
import { BiChevronDown } from "react-icons/bi"
import { ButtonIcon, clsx } from "@julseb-lib/react"
import type { Message } from "types"

export const ScrollBottom: FC<IScrollBottom> = ({ containerRef, messages }) => {
	const [isButtonVisible, setIsButtonVisible] = useState(false)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = container
			const atBottom = scrollTop + clientHeight >= scrollHeight - 100
			setIsButtonVisible(!atBottom)
		}

		container.addEventListener("scroll", handleScroll)
		handleScroll()

		return () => container.removeEventListener("scroll", handleScroll)
	}, [messages])

	const scrollBottom = () => {
		if (containerRef.current)
			containerRef.current.scrollTop = containerRef.current.scrollHeight
	}

	return (
		<ButtonIcon
			icon={<BiChevronDown />}
			className={clsx(
				"bottom-2 left-2 absolute size-6",
				isButtonVisible ? "visible opacity-100" : "invisible opacity-0",
			)}
			onClick={scrollBottom}
			variant="ghost"
		/>
	)
}

interface IScrollBottom {
	containerRef: RefObject<HTMLDivElement>
	messages: Array<Message>
}
