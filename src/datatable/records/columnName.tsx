import {Label} from "@/components/ui/label.tsx";
import {cn} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";
import {Column} from "@tanstack/react-table";
import {TExpense} from "@/api/Record.ts";
import {Search, X} from "lucide-react";

const HeaderName = ({column}: { column: Column<TExpense, unknown> }) => (
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
        {!!column.getFilterValue() && <div className="flex-1 p-2" onClick={() => column.setFilterValue('')}>
            <X/>
        </div>}
    </Label>
)

export {
    HeaderName
}
