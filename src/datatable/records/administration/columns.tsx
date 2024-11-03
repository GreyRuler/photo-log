import {TExpense} from "@/api/Record.ts";
import {cn, getPriority} from "@/lib/utils.ts";
import {TooltipPriority} from "@/components/TooltipPriority.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import Form from "@/form/stars/Form.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {Star } from "lucide-react";
import {HeaderName} from "@/datatable/records/columnName.tsx";

const columns: ColumnDef<TExpense>[] = [
    {
        accessorKey: "name",
        header: HeaderName,
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

export {columns}
