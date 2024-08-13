import Entity from "@/api/Entity.ts";

export type TCategory = {
    id: number
    name: string
}

export default class Category extends Entity {
    static URL = "/categories"
}
