import {createFileRoute} from '@tanstack/react-router'
import User from "@/api/User.ts";

export const Route = createFileRoute('/administration/users')({
    loader: () => User.list(),
    component: AdministrationUsers
})

function AdministrationUsers() {
    const users = Route.useLoaderData()
    console.log(users)
    return (
        <div>AdministrationUsers</div>
    )
}
