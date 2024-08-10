import axiosClient from "./axios-client";

export type TUser = {
    id: number
    name: string
    username: string
    token: string
}

export default class User {
    static async list() {
        const {data} = await axiosClient.get<TUser[]>('/users')
        return data
    }

    static async login({username, password}: { username: string, password: string }) {
        const {data} = await axiosClient.post<TUser>('/login', {username, password})
        return data
    }
}
