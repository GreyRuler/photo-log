import {ColumnDef} from "@tanstack/react-table";
import {createColumnActions} from "@/datatable/columnActions.tsx";
import {TCategory} from "@/api/Category.ts";

export const columns: ColumnDef<TCategory>[] = [
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
