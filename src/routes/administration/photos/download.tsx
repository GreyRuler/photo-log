import {createFileRoute, redirect} from '@tanstack/react-router'
import {z} from "zod";

const fallback = '/administration'

export const Route = createFileRoute('/administration/photos/download')({
    validateSearch: z.object({
        redirect: z.string().optional().catch(''),
    }),
    beforeLoad: async ({search}) => {
        window.location.href = `/zip`;
        throw redirect({to: search.redirect || fallback})
    }
})
