import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ReactNode} from "react";

type Props = {
    title: string
    children: ReactNode
}

export default function Page({title, children}: Props) {
    return (
        <div className="h-full w-full overflow-auto flex">
            <Card className="w-[350px] m-auto bg-slate-800 border-slate-900 text-white">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}
