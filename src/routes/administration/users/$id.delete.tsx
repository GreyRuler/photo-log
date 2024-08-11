import {createFileRoute, redirect} from '@tanstack/react-router'
import User from "@/api/User.ts";

export const Route = createFileRoute('/administration/users/$id/delete')({
    beforeLoad: ({params: {id}}) => {
        User.delete(id).then(() => {
            redirect({
                to: "/administration/users"
            })
        })
    }
})
