import {
    ColumnDef, ExpandedState,
    flexRender,
    getCoreRowModel, getExpandedRowModel, getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useState} from "react";
import {Route} from "@/routes/details.$id";
import {TExpense} from "@/api/Expense.ts";
import {cn} from "@/lib/utils.ts";

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]
}

export function DataTable(
    {columns, data}: DataTableProps<TExpense>
) {
    const navigate = Route.useNavigate()
    const [expanded, setExpanded] = useState<ExpandedState>({});

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
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
                                onClick={
                                    row.original.number
                                        ? row.getToggleExpandedHandler()
                                        : () => navigate({to: '/details/$id', params: {id: row.original.id}})
                                }
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className={cn(
                                    !row.original.count && !row.original.number && "pointer-events-none text-slate-400",
                                    "border-slate-500",
                                )}
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
