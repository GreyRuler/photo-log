import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Info} from "lucide-react";
import {Priority} from "@/constants/priority.ts";
import {cn, getPriority} from "@/lib/utils.ts";

export function TooltipPriority() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer m-auto w-full inline-flex justify-center"><Info/></div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-slate-900 text-white">
                <DialogHeader>
                    <DialogTitle>Индикаторы приоритетности</DialogTitle>
                    <DialogDescription>Эти индикаторы отображают уровень приоритета задач.</DialogDescription>
                </DialogHeader>
                <LinePriority priority={Priority.HIGH}/>
                <LinePriority priority={Priority.MEDIUM_HIGH}/>
                <LinePriority priority={Priority.MEDIUM}/>
                <LinePriority priority={Priority.LOW_MEDIUM}/>
                <LinePriority priority={Priority.LOW}/>
                <LinePriority priority={Priority.VERY_LOW}/>
                <LinePriority priority={Priority.MINIMAL}/>
            </DialogContent>
        </Dialog>
    )
}

function LinePriority({priority}: {priority: Priority}) {
    const {color, text} = getPriority(priority)
    return (
        <div>
            <span className={cn(
                "inline-flex rounded-full size-3 m-auto cursor-pointer",
                color
            )}/>{' '}
            <span>{text}</span>
        </div>
    )
}
