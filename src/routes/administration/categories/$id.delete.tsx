import {createFileRoute, redirect} from '@tanstack/react-router'
import Category from "@/api/Category.ts";

export const Route = createFileRoute('/administration/categories/$id/delete')({
    beforeLoad: async ({params: {id}}) => {
        await Category.delete(id)
        throw redirect({
            to: "/administration/categories"
        })
    }
})
