import {z} from "zod";


const formSchema = (max: number = 1) => z.object({
    count: z.coerce.number()
        .min(0, "Не меньше 0")
        .max(max, `Не больше ${max}`),
    file: z.instanceof(File),
})

export {
    formSchema,
}
