import { z } from "zod";

const updateUserSchema = z.object({
    name: z.string().min(1, "Имя обязательно для заполнения"),
    isAdmin: z.boolean(),
    username: z.string()
        .min(1, "Логин пользователя обязательно для заполнения")
        .max(255, "Логин пользователя не должно превышать 255 символов"),
});

const createUserSchema = updateUserSchema.extend({
    password: z.string()
        .min(8, "Пароль должен содержать не менее 8 символов")
        .regex(/[a-zA-Z]/, "Пароль должен содержать буквы")
        .regex(/[0-9]/, "Пароль должен содержать цифры")
        .regex(/[\W_]/, "Пароль должен содержать символы"),
});

export {
    createUserSchema,
    updateUserSchema,
};
