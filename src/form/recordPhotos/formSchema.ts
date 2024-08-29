import {z} from "zod";


const formSchema =  z.object({
    count: z.coerce.number()
        .min(0, "Не меньше 0"),
    file: z.instanceof(File),
})

export {
    formSchema,
}
