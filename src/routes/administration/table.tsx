import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/administration/table')({
    component: AdministrationTable
})

function AdministrationTable() {
    return (
        <div className="h-full p-4 overflow-auto">

        </div>
    )
}
