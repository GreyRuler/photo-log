import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/logout')({
    beforeLoad: ({context}) => {
        context.auth.logout().then(() => {
            redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            })
        })
    }
})