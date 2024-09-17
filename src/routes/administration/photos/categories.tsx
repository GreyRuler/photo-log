import {createFileRoute} from '@tanstack/react-router'
import {useToast} from "@/components/ui/use-toast.ts";
import CategoryPhoto, {DCategoryPhoto} from "@/api/CategoryPhoto.ts";
import {ImagesNotFound} from "@/components/ImagesNotFound.tsx";
import {CategoryImageGrid} from "@/components/CategoryImageGrid.tsx";

export const Route = createFileRoute('/administration/photos/categories')({
    loaderDeps: ({ search: { dateFrom, dateTo } }) => ({ dateFrom, dateTo }),
    loader: ({deps: {dateFrom, dateTo}}) => CategoryPhoto.all<DCategoryPhoto>(dateFrom!, dateTo!),
    component: CategoriesPhotos
})

function CategoriesPhotos() {
    const {toast} = useToast()
    const navigate = Route.useNavigate()
    const photos = Route.useLoaderData()
    const search = Route.useSearch()

    const onDelete = async (id: number, owner: number) => {
        try {
            await CategoryPhoto.delete(String(id), owner)
            await navigate({search})
            toast({
                description: "Фотография удалена"
            })
        } catch (e) {
            if (e instanceof Error) toast({
                description: e.message
            })
        }
    }

    if (photos.length === 0) {
        return <ImagesNotFound/>
    }

    return (
        <CategoryImageGrid images={photos} onDelete={onDelete}/>
    )
}
