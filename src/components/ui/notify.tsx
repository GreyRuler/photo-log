import {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";

type Props = {
    isView: boolean
    size?: number
    children: ReactNode
}

export function Notify({isView, size = 4, children}: Props) {
    return (
        <div className="relative">
            <div className={cn(
                "h-full",
                isView || `notify after:w-${size} after:h-${size}`
            )}>
                {children}
            </div>
        </div>
    )
}
