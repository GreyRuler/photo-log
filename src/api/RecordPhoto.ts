import Entity from "@/api/Entity.ts";

export type DRecordPhoto = {
    id: number;
    path: string;
    increment: number;
    count: number;
    record_id: number;
}

export default class RecordPhoto extends Entity {
    static URL = "records.photos"
}
