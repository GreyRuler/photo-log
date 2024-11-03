import {TExpense} from "@/api/Record.ts";
import {cn, getPriority} from "@/lib/utils.ts";
import {TooltipPriority} from "@/components/TooltipPriority.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { Triangle } from "lucide-react";
import {HeaderName} from "@/datatable/records/columnName.tsx";

export const columns: ColumnDef<TExpense>[] = [
    {
        accessorKey: "name",
        header: HeaderName,
        cell: ({row, getValue}) => (
            <div className={`pl-${4 * (row.depth - Math.floor(((row.depth) / 3)) * 3)}`}>
                {row.getCanExpand() ? (
                    <Triangle size={12} fill="white" className={cn(
                        'inline-block rotate-180',
                        row.getIsExpanded() ? 'rotate-180' : 'rotate-90',
                    )}/>
                ) : ''}{' '}
                {getValue<boolean>()}
            </div>
        ),
        // filterFn: (row, columnId, filterValue) => {
        //     return // true or false based on your custom logic
        // },
    },
    {
        accessorKey: "priority",
        header: () => <TooltipPriority/>,
        cell: ({row: {original: {priority, innerCount, level}}}) => {
            const {color, text} = getPriority(priority)

            if (level) {
                return (
                    <div className="rounded-full size-8 text-center m-auto cursor-pointer flex text-yellow-400">
                        <span className="m-auto">{priority ? `+ ${priority}` : ""}</span>
                    </div>
                )
            }

            return (
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn(
                                "rounded-full size-8 text-center m-auto cursor-pointer flex",
                                color
                            )}><span className="m-auto">{Math.ceil(innerCount)}</span></div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{text}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        },
    },
]
