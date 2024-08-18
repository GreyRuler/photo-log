import {z} from "zod";

const formSchema = z.object({
    title: z.string()
        .min(1, { message: "Имя папки не может быть пустым." })
        .max(255, { message: "Имя папки не может быть длиннее 255 символов." }),
    content: z.string(),
})

export {
    formSchema,
}
