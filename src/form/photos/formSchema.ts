import {z} from "zod";


const formSchema = (categories: string[]) => z.object({
    category: z.enum(categories as [string, ...string[]], {
        required_error: "Необходимо выбрать категорию",
    }),
    file: z.instanceof(Blob),
})

export type FormSchemaPhoto = z.infer<ReturnType<typeof formSchema>>

export {
    formSchema
}
