import {createFileRoute} from '@tanstack/react-router'
import Photo from "@/api/Photo.ts";
import {z} from "zod";
import {useEffect, useState} from "react";

const photoByCategorySearchSchema = z.object({
    category: z.string().catch(''),
})

export const Route = createFileRoute('/photos/category')({
    validateSearch: photoByCategorySearchSchema,
    loaderDeps: ({search: {category}}) => Photo.allByCategory(category),
    component: Category
})

function Category() {
    const [images, setImages] = useState<string[]>([])
    const promise: Promise<string[]> = Route.useLoaderDeps()

    useEffect(() => {
        promise.then((data) => {
            setImages(data)
        })
    }, [promise])


    return (
        <div className="h-full overflow-auto space-y-6">
            {images.map((image) => <img src={`/images/${encodeURIComponent(encodeURIComponent(image))}`} />)}
        </div>
    )
}
