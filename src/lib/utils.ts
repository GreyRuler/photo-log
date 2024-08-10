import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {TUser} from "@/api/User.ts";
import {ACCESS_USER_KEY} from "@/config.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getStoredUser() {
    const user = localStorage.getItem(ACCESS_USER_KEY)
    if (!user) return null
    return JSON.parse(user) as TUser
}

export function setStoredUser(user: TUser | null) {
    if (user) {
        localStorage.setItem(ACCESS_USER_KEY, JSON.stringify(user))
    } else {
        localStorage.removeItem(ACCESS_USER_KEY)
    }
}
