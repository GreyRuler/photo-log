import axiosClient from "@/api/axios-client.ts";

export default class Entity {
    static URL: string

    static async list<T>() {
        const {data} = await axiosClient.get<T[]>(this.URL)
        return data
    }

    static async item<T>(id: string) {
        const {data} = await axiosClient.get<T>(`${this.URL}/${id}`)
        return data
    }

    static async create<T, TData>(formData: TData) {
        const {data} = await axiosClient.postForm<T>(this.URL, formData)
        return data
    }

    static async update<T, TData>(id: string, formData: TData) {
        const {data} = await axiosClient.putForm<T>(`${this.URL}/${id}`, formData)
        return data
    }

    static async delete<T>(id: string) {
        const {data} = await axiosClient.delete<T>(`${this.URL}/${id}`)
        return data
    }
}
