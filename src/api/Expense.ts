import axios from "axios"
import {structureData} from "../lib/utils";

export type TExpense = {
    id: string
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

export class Expense {
    private static cast_numbers: string = 'count,k,innerCount';

    static async list() {
        const {data} = await axios.get<TExpense[]>(
            'https://sheetdb.io/api/v1/b3hyxs2to6g8m',
            {
                params: {
                    offset: 1,
                    cast_numbers: this.cast_numbers
                }
            }
        )

        return {
            data: structureData(data)
        }
    }

    static async item(id: string) {
        const {data} = await axios.get<TExpense[]>(
            'https://sheetdb.io/api/v1/b3hyxs2to6g8m/search',
            {
                params: {
                    id,
                    cast_numbers: this.cast_numbers
                }
            }
        )

        return {data: data[0]}
    }
}
