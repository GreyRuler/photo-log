import axiosClient from "@/api/axios-client.ts";
import {FormSchemaPhoto} from "@/form/photos/formSchema.ts";

export default class Photo {
    static async all() {
        const {data} = await axiosClient.get<string[]>('/photos')
        return data.map((item) => item.replace("common/", ""))
    }

    static async allByCategory(category: string) {
        const {data} = await axiosClient.get<string[]>('/photos/category', {
            params: new URLSearchParams({category})
        })
        return data
    }

    static async upload(formData: FormSchemaPhoto) {
        const {data} = await axiosClient.postForm('/photos/upload', formData)
        return data
    }
}
