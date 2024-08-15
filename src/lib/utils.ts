import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {TUser} from "@/api/User.ts";
import {ACCESS_USER_KEY, NOTIFICATIONS_KEY} from "@/config.ts";
import {TNotification} from "@/api/Notification.ts";

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

export function getStoredNotifications() {
    const notifications = localStorage.getItem(NOTIFICATIONS_KEY)
    if (!notifications) return []
    return JSON.parse(notifications) ?? [] as TNotification[]
}

export function setStoredNotifications(notifications: TNotification[]) {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications))
}
