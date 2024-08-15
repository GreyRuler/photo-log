import {createFileRoute} from '@tanstack/react-router'
import {TExpense} from "@/api/Record.ts";
import {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "@/components/ui/data-table";
import {Search, Triangle} from "lucide-react";
import {Fragment} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {cn} from "@/lib/utils.ts";
import Sheet from "@/api/Sheet.ts";

export const Route = createFileRoute('/')({
    loader: () => Sheet.data(),
    component: IndexLayout,
})

export const columns: ColumnDef<TExpense>[] = [
    {
        accessorKey: "name",
        header: ({column}) => (
            <Label className={cn(
                "flex items-center",
                !!column.getFilterValue() && "text-white",
            )}>
                <Search/>
                <Input
                    className="focus-visible:ring-0 focus-visible:underline border-none"
                    type="text"
                    value={(column.getFilterValue() ?? '') as string}
                    onChange={e => column.setFilterValue(e.target.value)}
                    placeholder="Наименование затрат"
                />
            </Label>
        ),
        cell: ({row, getValue}) => (
            <Fragment>
                {row.getCanExpand() ? (
                    <Triangle size={12} fill="white" className={cn(
                        'inline-block rotate-180',
                        row.getIsExpanded() ? 'rotate-180' : 'rotate-90'
                    )}/>
                ) : ''}{' '}
                {getValue<boolean>()}
            </Fragment>
        ),
    },
]

function IndexLayout() {
    const data = Route.useLoaderData()

    return (
        <div className="h-full">
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
