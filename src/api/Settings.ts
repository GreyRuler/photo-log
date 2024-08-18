import axiosClient from "@/api/axios-client.ts";
import {SettingsSchema} from "@/form/settings/formSchema.ts";

export default class Settings {
    static async get() {
        const {data} = await axiosClient.get('/settings')
        return data
    }

    static async update(formData: SettingsSchema) {
        const {data} = await axiosClient.post('/settings/update', formData)
        return data
    }
}
