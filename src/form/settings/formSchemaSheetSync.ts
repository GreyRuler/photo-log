import {z} from "zod";

const formSchema = z.object({
    sheet_api: z.string().regex(/^https:\/\/sheetdb\.io\/api\/v1\/[a-zA-Z0-9]+$/, {
        message: "Неправильный формат URL. Пример: https://sheetdb.io/api/v1/bhqssd6bu9c85"
    }),
});

export type FormSchemaSheetSync = z.infer<typeof formSchema>

export {
    formSchema
}
