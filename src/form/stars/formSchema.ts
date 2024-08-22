import {z} from "zod";

const formSchema = z.object({
    stars: z.number().min(0).max(10),
})

export type StarFormSchema = z.infer<typeof formSchema>

export {
    formSchema,
}
