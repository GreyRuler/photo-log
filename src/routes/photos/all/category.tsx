import {createFileRoute} from '@tanstack/react-router'
import Photo from "@/api/Photo.ts";
import {z} from "zod";
import {nanoid} from "nanoid";

const photoByCategorySearchSchema = z.object({
    category: z.string().catch(''),
})

export const Route = createFileRoute('/photos/all/category')({
    validateSearch: photoByCategorySearchSchema,
    loaderDeps: ({search: {category}}) => ({category}),
    loader: ({deps: {category}}) => Photo.allByCategory(category),
    component: Category
})

function Category() {
    const images = Route.useLoaderData()

    return (
        <div className="h-full overflow-auto">
            <div className="h-fit flex flex-wrap">
                {images.map((image) => (
                    <div key={nanoid()} className="w-1/3 p-1">
                        <div className="aspect-square relative">
                            <img
                                className="object-cover w-full h-full"
                                src={`/images/${encodeURIComponent(encodeURIComponent(image))}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
