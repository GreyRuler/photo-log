import Entity from "@/api/Entity.ts";
import axiosClient from "@/api/axios-client.ts";

export type DRecordPhoto = {
    id: number;
    path: string;
    increment: number;
    count: number;
    record_id: number;
    owner: number;
}

export default class RecordPhoto extends Entity {
    static URL = "records.photos"

    static async all<T>(dateFrom: string, dateTo: string) {
        const {data} = await axiosClient.get<T[]>('/records/photos', {
            params: {
                dateFrom,
                dateTo
            }
        })
        return data
    }
}
