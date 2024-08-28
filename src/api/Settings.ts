import axiosClient from "@/api/axios-client.ts";
import {SettingsSchema} from "@/form/settings/formSchema.ts";

export type DSettings = {
    sheet_api: string
    main_url: string
    event_location: string
    event_name: string
}

export default class Settings {
    static async get() {
        const {data} = await axiosClient.get<DSettings>('/settings')
        return data
    }

    static async update(formData: SettingsSchema) {
        const {data} = await axiosClient.post('/settings/update', formData)
        return data
    }
}
