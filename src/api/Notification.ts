import Entity from "@/api/Entity.ts";

export type TNotification = {
    id: number
    title: string
    content: string
    date: string
}

export default class Notification extends Entity {
    static URL = "/notifications"
}
