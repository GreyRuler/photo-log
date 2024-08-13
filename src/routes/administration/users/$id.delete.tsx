import {createFileRoute, redirect} from '@tanstack/react-router'
import User from "@/api/User.ts";

export const Route = createFileRoute('/administration/users/$id/delete')({
    beforeLoad: async ({params: {id}}) => {
        await User.delete(id)
        throw redirect({
            to: "/administration/users"
        })
    }
})
