import {createFileRoute} from '@tanstack/react-router'
import {ColumnDef} from "@tanstack/react-table";
import {Record, TExpense} from "@/api/Record.ts";
import {Label} from "@/components/ui/label.tsx";
import {cn} from "@/lib/utils.ts";
import {Search, Star, Triangle} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Fragment} from "react";
import {DataTable} from "@/components/ui/data-table.tsx";

export const Route = createFileRoute('/favorites')({
    loader: () => Record.favorites(),
    component: Favorites,
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
    {
        accessorKey: "stars",
        header: () => (
            <div className="m-auto w-full inline-flex justify-center">
                <Star className="stroke-yellow-400 fill-yellow-400"/>
            </div>
        ),
        cell: ({getValue}) => (
            <div className="flex">
                <span className="m-auto">{getValue<number>()}</span>
            </div>
        ),
    },
]

function Favorites() {
    const data = Route.useLoaderData()

    return (
        <div className="h-full">
            <DataTable columns={columns} data={data} pagination={false}/>
        </div>
    )
}
