import {createFileRoute} from '@tanstack/react-router'
import {DataTable} from "@/components/ui/data-table.tsx";
import {Record, TExpense} from "@/api/Record.ts";
import {columns} from "@/datatable/records/administration/columns.tsx";

export const Route = createFileRoute('/administration/table/')({
    loader: () => Record.list<TExpense>(),
    component: AdministrationTable,
})

function AdministrationTable() {
    const data = Route.useLoaderData()
    const navigate = Route.useNavigate()

    const onNavigate = (id: string) => navigate({to: '/administration/table/details/$id', params: {id}})

    return (
        <div className="h-full">
            <DataTable columns={columns} data={data} pagination={true} onRowNavigate={onNavigate}/>
        </div>
    )
}
