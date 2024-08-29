import {createFileRoute} from '@tanstack/react-router'
import {TExpense} from "@/api/Record.ts";
import {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "@/components/ui/data-table";
import {Search, Triangle} from "lucide-react";
import {Fragment} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {cn, getPriority} from "@/lib/utils.ts";
import Sheet from "@/api/Sheet.ts";
import {TooltipPriority} from "@/components/TooltipPriority.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

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
                    placeholder="Поиск по объектам"
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
        accessorKey: "priority",
        header: () => <TooltipPriority/>,
        cell: ({row: {original: {priority}}}) => {
            const {color, text} = getPriority(priority)
            return <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className={cn(
                            "rounded-full size-3 m-auto cursor-pointer",
                            color
                        )}/>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{text}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        },
    },
]

function IndexLayout() {
    const data = Route.useLoaderData()
    const navigate = Route.useNavigate()

    const onNavigate = (id: string) => navigate({to: '/details/$id', params: {id}})

    return (
        <div className="h-full">
            <DataTable columns={columns} data={data} pagination={false} onRowNavigate={onNavigate}/>
        </div>
    )
}
