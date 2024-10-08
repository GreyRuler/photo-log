import {z} from "zod";

const formSchema = z.object({
    event_name: z.string(),
    event_location: z.string(),
    main_url: z.string(),
})

export type SettingsSchema = z.infer<typeof formSchema>

export {
    formSchema,
}
