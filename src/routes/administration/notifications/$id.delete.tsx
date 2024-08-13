import {createFileRoute, redirect} from '@tanstack/react-router'
import Notification from "@/api/Notification.ts";

export const Route = createFileRoute('/administration/notifications/$id/delete')({
    beforeLoad: async ({params: {id}}) => {
        await Notification.delete(id)
        throw redirect({
            to: "/administration/notifications"
        })
    }
})
