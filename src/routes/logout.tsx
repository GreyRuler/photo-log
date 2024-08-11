import {createFileRoute, redirect, useRouter} from '@tanstack/react-router'
import User from "@/api/User.ts";
import {useAuth} from "@/context/auth.tsx";

export const Route = createFileRoute('/logout')({
    // beforeLoad: async ({context}) => {
    //     await User.logout()
    //     await context.auth.logout()
    //     redirect({
    //         to: '/login',
    //     })
    // },
    component: () => {
        const router = useRouter()
        const navigate = Route.useNavigate()
        const auth = useAuth()

        auth.logout().then(() => {
            router.invalidate().finally(() => {
                navigate({ to: '/' })
            })
        })
    }
})
