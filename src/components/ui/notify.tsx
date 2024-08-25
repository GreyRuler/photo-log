import {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";

type Props = {
    isView: boolean
    size?: number
    className?: string
    children: ReactNode
}

export function Notify({isView, className, size = 4, children}: Props) {
    return (
        <div className="relative">
            <div className={cn(
                "h-full",
                className,
                isView || `notify after:w-${size} after:h-${size}`
            )}>
                {children}
            </div>
        </div>
    )
}
