import axiosClient from "@/api/axios-client.ts";
import {TExpense} from "@/api/Record.ts";

export default class Sheet {
    static async collect(sheet_api: string) {
        return await axiosClient.post('/sheet/collect', {sheet_api})
    }

    static async data() {
        const {data} =  await axiosClient.get<TExpense[]>('/sheet/data')
        return data
    }
}
