import axiosClient from "./axios-client";

type LoginResponse = {
    user: TUser
    token: string
}

type TUser = {
    id: number
    name: string
    username: string
    email_verified_at: string
    created_at: string
    updated_at: string
}

export default class User {
    static async list() {
        const {data} = await axiosClient.get<TUser[]>('/users')
        return data
    }

    static async login({username, password}: { username: string, password: string }) {
        const {data} = await axiosClient.post<LoginResponse>('/login', {username, password})
        return data
    }
}
