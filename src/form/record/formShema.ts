import {z} from "zod";


const formSchema = (max: number = 1) => z.object({
    count: z.coerce.number().min(1).max(max, `Не больше ${max}`),
    file: z.instanceof(FileList)
        .refine((file) => file?.length > 0)
})

export {
    formSchema,
}
