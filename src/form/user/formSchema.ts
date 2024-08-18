import {z} from "zod";

const formSchema = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
    isAdmin: z.boolean(),
})

export {
    formSchema,
}
