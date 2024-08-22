import {createFileRoute, Link} from '@tanstack/react-router'
import Photo from "@/api/Photo.ts";
import {CategoriesNotFound} from "@/components/CategoriesNotFound.tsx";
import {nanoid} from "nanoid";

export const Route = createFileRoute('/photos/all/')({
    loader: () => Photo.all(),
    component: Index,
})

function Index() {
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
                        to="/photos/all/category"
                        search={{
                            category: item
                        }}
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </div>
    )
}
