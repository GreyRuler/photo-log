import {z} from "zod";

const formSchema = z.object({
    name: z.string()
        .min(1, { message: "Имя папки не может быть пустым." })
        .max(255, { message: "Имя папки не может быть длиннее 255 символов." })
        .regex(/^[a-zA-Zа-яА-ЯёЁ0-9_\-]+$/, {
            message: "Имя папки может содержать только буквы, цифры, подчеркивания и дефисы.",
        }),
})

export {
    formSchema,
}
