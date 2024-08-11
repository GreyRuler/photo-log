import axiosClient from "@/api/axios-client.ts";
import {z} from "zod";
import {formSchema} from "@/form/record/formShema.ts";
import Entity from "@/api/Entity.ts";

export type TExpense = {
    id: number
    number: string // "№ п/п"
    name: string // "Наименование затрат"
    unit: string // "Ед. изм."
    count: number // "Кол-во"
    timeArrival: string // "Примерная дата"
    timeEnd: string // "Крайнее время для фотографии"
    contractor: string // "Ответственный от подрядчика"
    k: number // "Коэффициент погрешности"
    location: string // "Локация"
    comment: string // "Комментарии"
    innerCount: number // "Счётчик сделанных фото"
    folder: string // "Родительский раздел"
    subRows?: TExpense[]
}

export class Record extends Entity {
    static URL = "/records"

    static async photo(id: number, formData: z.infer<ReturnType<typeof formSchema>>) {
        const {data} = await axiosClient.postForm<TExpense>(`/records/${id}/photo`, formData)
        return data
    }
}
