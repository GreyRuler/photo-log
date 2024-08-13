import {ColumnDef} from "@tanstack/react-table";
import {TUser} from "@/api/User.ts";
import {createColumnActions} from "@/datatable/columnActions.tsx";

export const columns: ColumnDef<TUser>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "name",
        header: "Имя",
    },
    {
        accessorKey: "username",
        header: "Логин",
    },
    {
        accessorKey: "password",
        header: "Пароль",
        cell: "********"
    },
    {
        accessorKey: "role",
        header: "Роль",
    },
    createColumnActions('/administration/users')
]
