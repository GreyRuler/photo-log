import {createFileRoute, Link} from '@tanstack/react-router'
import {CategoriesNotFound} from "@/components/CategoriesNotFound.tsx";
import {nanoid} from "nanoid";
import Category, {TCategory} from "@/api/Category.ts";

export const Route = createFileRoute('/categories/')({
    loader: () => Category.list<TCategory>(),
    component: Categories
})

function Categories() {
    const data = Route.useLoaderData()

    if (data.length === 0) {
        return <CategoriesNotFound/>
    }

    return (
        <div className="p-4 h-full overflow-auto">
            <div className="space-y-4 flex flex-col">
                {data.map((item) => (
                    <Link
                        key={nanoid()}
                        className="text-base rounded-md bg-slate-700 p-4"
                        to="/categories/$id"
                        params={{
                            id: String(item.id)
                        }}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
