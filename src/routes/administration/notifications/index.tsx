import {createFileRoute} from '@tanstack/react-router'
import {flexRender, getCoreRowModel, getFilteredRowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "@/datatable/notifications/columns.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import Notification, {TNotification} from "@/api/Notification.ts";

export const Route = createFileRoute('/administration/notifications/')({
    loader: () => Notification.list<TNotification>(),
    component: AdministrationNotifications
})

function AdministrationNotifications() {
    const data = Route.useLoaderData()

    const table = useReactTable({
        data,
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
