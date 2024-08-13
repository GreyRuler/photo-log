import Entity from "@/api/Entity.ts";

export type TNotification = {
    id: number
    title: string
    content: string
}

export default class Notification extends Entity {
    static URL = "/notifications"
}
