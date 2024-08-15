import {ColumnDef} from "@tanstack/react-table";
import {createColumnActions} from "@/datatable/columnActions.tsx";
import {TNotification} from "@/api/Notification.ts";

export const columns: ColumnDef<TNotification>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "title",
        header: "Заголовок",
    },
    {
        accessorKey: "content",
        header: "Содержание",
    },
    createColumnActions('/administration/notifications')
]
