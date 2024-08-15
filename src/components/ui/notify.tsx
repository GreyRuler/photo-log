import {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";

type Props = {
    isView: boolean
    children: ReactNode
}

export function Notify({isView, children}: Props) {
    return (
        <div className="relative">
            <div className={cn(
                "h-full",
                isView || "notify"
            )}>
                {children}
            </div>
        </div>
    )
}
