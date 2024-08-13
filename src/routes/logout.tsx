import {createFileRoute, redirect} from '@tanstack/react-router'
import User from "@/api/User.ts";

export const Route = createFileRoute('/logout')({
    beforeLoad: async ({context}) => {
        await User.logout()
        await context.auth.logout()
        throw redirect({
            to: '/login',
        })
    },
})
