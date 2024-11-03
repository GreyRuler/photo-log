import {createFileRoute} from '@tanstack/react-router'
import {DataTable} from "@/components/ui/data-table";
import Sheet from "@/api/Sheet.ts";
import {columns} from "@/datatable/records/index/columns.tsx";

export const Route = createFileRoute('/')({
    loader: () => Sheet.data(),
    component: IndexLayout,
})

function IndexLayout() {
    const data = Route.useLoaderData()
    const navigate = Route.useNavigate()

    const onNavigate = (id: string) => navigate({to: '/details/$id', params: {id}})

    return (
        <div className="h-full">
            <DataTable columns={columns} data={data} pagination={false} onRowNavigate={onNavigate}/>
        </div>
    )
}
