import axiosClient from "@/api/axios-client.ts";
import Entity from "@/api/Entity.ts";
import {DRecordPhoto} from "@/api/RecordPhoto.ts";

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
    priority: number
    stars: number
    level: number
    photos: DRecordPhoto[]
}

export class Record extends Entity {
    static URL = "/records"

    static async favorites() {
        const {data} = await axiosClient.get<TExpense[]>(`/records/favorites`)
        return data
    }
}
