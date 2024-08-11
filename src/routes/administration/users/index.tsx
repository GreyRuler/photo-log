import {Link, createFileRoute} from '@tanstack/react-router'
import User, {TUser} from "@/api/User.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel, getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {Pencil, Plus, Trash} from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";

export const Route = createFileRoute('/administration/users/')({
    loader: () => User.list(),
    component: AdministrationUsers
})

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
    {
        id: "actions",
        enableHiding: false,
        header: () => (
            <Link to="/administration/users/create">
                <Button className="rounded-full p-2"><Plus size={20}/></Button>
            </Link>
        ),
        cell: ({row}) => (
            <div className="flex gap-2">
                <Link to={`/administration/users/${row.original.id}/update`}>
                    <Button className="rounded-full p-2"><Pencil size={20}/></Button>
                </Link>
                <Link to={`/administration/users/${row.original.id}/delete`} preload={false}>
                    <Button className="rounded-full p-2"><Trash size={20}/></Button>
                </Link>
            </div>
        ),
    },
]

function AdministrationUsers() {
    const users = Route.useLoaderData()

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        filterFromLeafRows: true, // filter and search through sub-rows
    })

    return (
        <div className="flex h-full">
            <Table className="border-slate-500">
                <TableHeader className="sticky top-0 z-50 bg-slate-800 outline outline-1 outline-slate-500 ">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="w-full hover:bg-inherit border-slate-500">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className='z-0'>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="border-slate-500"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Объекты отсутствуют
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
