import {
    ColumnDef, ColumnSort, ExpandedState,
    flexRender,
    getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
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
import {TExpense} from "@/api/Record.ts";
import {cn} from "@/lib/utils.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
// import {ScrollArea} from "@/components/ui/scroll-area.tsx";

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]
    onRowNavigate: (id:string) => void
    pagination: boolean
}

export function DataTable(
    {columns, data, onRowNavigate, pagination = false}: DataTableProps<TExpense>
) {
    const [sorting, setSorting] = useState<ColumnSort[]>([])
    const [expanded, setExpanded] = useState<ExpandedState>({0:true});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            expanded,
        },
        onExpandedChange: setExpanded,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
        getExpandedRowModel: getExpandedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getSubRows: (row) => row.subRows,
        filterFromLeafRows: true, // filter and search through sub-rows
    })

    return (
        <div className={cn(
            "flex h-full",
            pagination && "flex-col"
        )}>
            {/*<ScrollArea className="relative">*/}
                <Table>
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
                                            : () => onRowNavigate(String(row.original.id))
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
            {/*</ScrollArea>*/}
            {pagination && <div className="flex items-center justify-between p-2 bg-slate-900 relative">
                <div className="flex items-center space-x-2">
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-16">
                            <SelectValue placeholder={table.getState().pagination.pageSize}/>
                        </SelectTrigger>
                        <SelectContent side="top" className="bg-slate-700 text-white border-white w-16">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`} className={cn(
                                    table.getState().pagination.pageSize === pageSize && 'bg-slate-900',
                                )}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {table.getPageCount() ? <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center text-sm font-medium">
                    {`Страница ${table.getState().pagination.pageIndex + 1} из ${table.getPageCount()}`}
                </div> : null}
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex bg-slate-900"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Первая</span>
                        <DoubleArrowLeftIcon className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 bg-slate-900"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Предыдущая</span>
                        <ChevronLeftIcon className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0 bg-slate-900"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Слудующая</span>
                        <ChevronRightIcon className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex bg-slate-900"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Последняя</span>
                        <DoubleArrowRightIcon className="h-4 w-4"/>
                    </Button>
                </div>
            </div>}
        </div>
    )
}
