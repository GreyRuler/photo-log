import Entity from "@/api/Entity.ts";

export type DCategoryPhoto = {
    id: number;
    path: string;
    record_id: number;
}

export default class CategoryPhoto extends Entity {
    static URL = "categories.photos"
}
