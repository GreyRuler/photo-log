import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {TUser} from "@/api/User.ts";
import {ACCESS_USER_KEY, NOTIFICATIONS_KEY, SETTINGS_KEY} from "@/config.ts";
import {TNotification} from "@/api/Notification.ts";
import {Priority} from "@/constants/priority.ts";
import {DSettings} from "@/api/Settings.ts";
import {toast} from "@/components/ui/use-toast.ts";

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

export function getStoredSettings() {
    const settings = localStorage.getItem(SETTINGS_KEY)
    if (!settings) return []
    return JSON.parse(settings) ?? [] as DSettings[]
}

export function setStoredSettings(settings: DSettings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function getPriority(priority: Priority) {
    switch (priority) {
        case Priority.HIGH:
            return {
                color: 'bg-red-600',
                text: "Просроченная задача, незакрытая позиция",
            }
        case Priority.MEDIUM_HIGH:
            return {
                color: 'bg-red-400',
                text: "Просроченная задача, частично закрытая позиция",
            }
        case Priority.MEDIUM:
            return {
                color: 'bg-red-200',
                text: "Просроченная задача, закрытая без учета коэффициента",
            }
        case Priority.LOW_MEDIUM:
            return {
                color: 'bg-yellow-600',
                text: "Текущая задача, незакрытая позиция",
            }
        case Priority.LOW:
            return {
                color: 'bg-yellow-400',
                text: "Текущая задача, частично закрытая позиция",
            }
        case Priority.VERY_LOW:
            return {
                color: 'bg-yellow-200',
                text: "Текущая задача, закрытая без учета коэффициента",
            }
        case Priority.MINIMAL:
            return {
                color: 'bg-green-600',
                text: "Задача на будущее",
            }
        default:
            return {
                color: 'bg-gray-300',
                text: "Неопределенный приоритет",
            }
    }
}

export function formatDate(date: Date) {
    const formatter = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })

    return formatter.format(date);
}

export function formatDateTimeOriginal(dateTimeOriginal: string) {
    const [dateOriginal, timeOriginal] = dateTimeOriginal.split(" ")
    const date = new Date(`${dateOriginal.replace(/:/g, '-')} ${timeOriginal}`);

    const formattedDate = formatDate(date);

    return formattedDate.replace(',', ' г.,');
}

export function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[arr.length - 1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
        toast({
            description: "Скопировано!"
        })
    }).catch(() => {
        toast({
            description: "При копировании произошла ошибка("
        })
    });
}
export function doesNotContainDot(str: string) {
    return !str.includes('.');
}
