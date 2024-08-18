import {z} from "zod";


const formSchema = (categories: string[]) => z.object({
    category: z.enum([categories[0], ...categories.slice(1)] as [string, ...string[]], {
        required_error: "Необходимо выбрать категорию",
    }),
    file: z.instanceof(FileList)
        .refine((file) => file?.length > 0),
})

export type FormSchemaPhoto = z.infer<ReturnType<typeof formSchema>>

export {
    formSchema
}
