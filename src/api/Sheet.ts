import axiosClient from "@/api/axios-client.ts";
import {TExpense} from "@/api/Record.ts";

export default class Sheet {
    static async collect(url: string) {
        return await axiosClient.post('/sheet/collect', {url})
    }

    static async data() {
        const {data} =  await axiosClient.get<TExpense[]>('/sheet/data')
        return data
    }
}
