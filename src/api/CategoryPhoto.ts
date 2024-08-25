import Entity from "@/api/Entity.ts";
import axiosClient from "@/api/axios-client.ts";
import {TCategory} from "@/api/Category.ts";

export type DCategoryPhoto = {
    id: number;
    path: string;
    category_id: number;
    owner: number;
    category: TCategory
}

export default class CategoryPhoto extends Entity {
    static URL = "categories.photos"

    static async all<T>(dateFrom: string, dateTo: string) {
        const {data} = await axiosClient.get<T[]>('/categories/photos', {
            params: {
                dateFrom,
                dateTo
            }
        })
        return data
    }
}
