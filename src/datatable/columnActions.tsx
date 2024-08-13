import {Link, LinkProps} from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Plus, Trash} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";

export const createColumnActions = <T extends { id: string | number }>(parentUrl: LinkProps["to"]): ColumnDef<T> => ({
    id: "actions",
    enableHiding: false,
    header: () => (
        <Link to={`${parentUrl}/create`}>
            <Button className="rounded-full p-2"> <Plus size={20}/></Button>
        </Link>
    ),
    cell: ({row}) => (
        <div className="flex gap-2">
            <Link to={`${parentUrl}/${row.original.id}/update`}>
                <Button className="rounded-full p-2"><Pencil size={20}/></Button>
            </Link>
            <Link to={`${parentUrl}/${row.original.id}/delete`} preload={false}>
                <Button className="rounded-full p-2"><Trash size={20}/></Button>
            </Link>
        </div>
    ),
})
