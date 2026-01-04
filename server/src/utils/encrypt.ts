import { encrypt as enc, decrypt as dec } from "@julseb-lib/utils"

const SECRET_KEY = process.env.SECRET_KEY ?? ""

export const encrypt = (str: string) => enc(str, SECRET_KEY)

export const decrypt = (str: string) => dec(str, SECRET_KEY)
