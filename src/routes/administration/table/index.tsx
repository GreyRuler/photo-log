import {createFileRoute} from '@tanstack/react-router'
import {DataTable} from "@/components/ui/data-table.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {Record, TExpense} from "@/api/Record.ts";
import {Label} from "@/components/ui/label.tsx";
import {cn, getPriority} from "@/lib/utils.ts";
import {Search, Star} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import Form from "@/form/stars/Form.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {TooltipPriority} from "@/components/TooltipPriority.tsx";

export const Route = createFileRoute('/administration/table/')({
    loader: () => Record.list<TExpense>(),
    component: AdministrationTable,
})

const columns: ColumnDef<TExpense>[] = [
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
    },
    {
        accessorKey: "unit",
        header: "Ед. изм.",
    },
    {
        accessorKey: "count",
        header: "Количество",
    },
    {
        accessorKey: "innerCount",
        header: "Загружено",
    },
    {
        accessorKey: "timeArrival",
        header: "Время заеда",
    },
    {
        accessorKey: "timeEnd",
        header: "Крайнее время",
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
    {
        accessorKey: "stars",
        header: ({column: {getIsSorted, toggleSorting, clearSorting}}) => (
            <div
                className="m-auto w-full inline-flex justify-center"
                onClick={() => {
                    if (getIsSorted() !== "desc") {
                        toggleSorting(getIsSorted() !== "desc")
                    } else {
                        clearSorting()
                    }
                }}
            >
                <Star className={cn(
                    getIsSorted() && "stroke-yellow-400 fill-yellow-400",
                    "cursor-pointer"
                )}/>
            </div>
        ),
        cell: ({row: {original: {id, stars}}}) => <Form key={id} id={id} stars={stars}/>,
    },
]

function AdministrationTable() {
    const data = Route.useLoaderData()
    const navigate = Route.useNavigate()

    const onNavigate = (id: string) => navigate({to: '/administration/table/details/$id', params: {id}})

    return (
        <div className="h-full">
            <DataTable columns={columns} data={data} pagination={true} onRowNavigate={onNavigate}/>
        </div>
    )
}
