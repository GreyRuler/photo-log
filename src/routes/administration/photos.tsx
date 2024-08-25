import {createFileRoute, Link, LinkProps, Outlet, useMatchRoute} from '@tanstack/react-router'
import {z} from "zod";
import {Button} from "@/components/ui/button.tsx";
import React from "react";
import {cn} from "@/lib/utils.ts";
import {DateRangePicker} from "@/components/ui/date-range-picker.tsx";
import {Route as RouteRecords} from "@/routes/administration/photos/records.tsx"
import {Route as RouteCategories} from "@/routes/administration/photos/categories.tsx"

const searchSchema = () => {
    const date = new Date()
    const dateFrom = formatDate(new Date(date.setHours(0, 0, 0, 0)))
    const dateTo = formatDate(new Date(date.setHours(23, 59, 59, 999)))
    return z.object({
        dateFrom: z.string().default(dateFrom),
        dateTo: z.string().default(dateTo),
    })
}

const formatDate = (date: Date) => date.toLocaleDateString('ru-RU', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
}).replace(',', '')

export const Route = createFileRoute('/administration/photos')({
    validateSearch: searchSchema(),
    loaderDeps: ({search}) => ({...search}),
    component: Photos
})

function Photos() {
    const {dateFrom, dateTo} = Route.useSearch()
    const recordsNavigate = RouteRecords.useNavigate()
    const categoriesNavigate = RouteCategories.useNavigate()
    const matchRoute = useMatchRoute()
    const recordsRoute = matchRoute({to: '/administration/photos/records'})

    return (
        <div className="h-full flex flex-col">
            <div className="flex gap-2 p-4 bg-slate-700">
                <DateRangePicker
                    onUpdate={async (values) => {
                        const {range: {from, to}} = values
                        const dateFrom = formatDate(from)
                        const dateTo = formatDate(to || new Date())
                        if (recordsRoute) {
                            await recordsNavigate({
                                search: {
                                    dateFrom, dateTo
                                }
                            })
                        } else {
                            await categoriesNavigate({
                                search: {
                                    dateFrom, dateTo
                                }
                            })
                        }
                    }}
                    initialDateFrom={dateFrom}
                    initialDateTo={dateTo}
                    align="start"
                    locale="ru"
                    showCompare={false}
                />
                <ButtonTab activeProps={{className: "group"}} className="w-full" title="По объектам"
                           to="/administration/photos/records" search={{dateTo, dateFrom}}/>
                <ButtonTab activeProps={{className: "group"}} className="w-full" title="Общие"
                           to="/administration/photos/categories" search={{dateTo, dateFrom}}/>
            </div>
            <div className="flex-1 overflow-auto">
                <Outlet/>
            </div>
        </div>
    )
}

type TButtonTab = LinkProps & {
    title: string
    className?: string
}

const ButtonTab = React.forwardRef<HTMLAnchorElement, TButtonTab>(({title, className, ...props}, ref) => (
    <Link ref={ref} className="w-full" {...props}>
        <Button className={cn(
            className,
            'border border-slate-900 bg-slate-700 group-data-[status=active]:bg-slate-900'
        )}>
            <span>{title}</span>
        </Button>
    </Link>
));
