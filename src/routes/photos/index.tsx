import {createFileRoute, Link} from '@tanstack/react-router'
import Photo from "@/api/Photo.ts";

export const Route = createFileRoute('/photos/')({
    loader: () => Photo.all(),
    component: Index,
})

function Index() {
    const data = Route.useLoaderData()

    return (
        <div className="p-4 h-full overflow-auto">
            <div className="space-y-4 flex flex-col">
                {data.map((item) => (
                    <Link
                        className="text-base rounded-md bg-slate-700 p-4"
                        to="/photos/category"
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
