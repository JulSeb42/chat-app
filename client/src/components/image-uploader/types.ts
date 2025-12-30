import type {
	ILibInputWithValidation,
	ILibInputCommon,
} from "@julseb-lib/react/component-props"

export type IImageUploader = Omit<
	ILibInputWithValidation,
	"children" | "value" | "counter" | "maxLength" | "hasListOpen"
> &
	Omit<ILibInputCommon, "inputVariant" | "inputBackground"> & {
		id: string
		image: string
		setImage: DispatchState<string>
		isUploading: boolean
		setIsUploading: DispatchState<boolean>
		icons?: { empty?: ReactElement; hover?: ReactElement }
		inputClassName?: ClassNames
		deleteButtonClassName?: ClassNames
		uploaderClassName?: ClassNames
	}
