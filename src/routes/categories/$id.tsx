import {createFileRoute} from '@tanstack/react-router'
import CategoryPhoto, {DCategoryPhoto} from "@/api/CategoryPhoto.ts";
import {ImageGrid} from "@/components/ImageGrid.tsx";
import {useToast} from "@/components/ui/use-toast.ts";

export const Route = createFileRoute('/categories/$id')({
    loader: ({params: {id}}) => CategoryPhoto.list<DCategoryPhoto>(Number(id)),
    component: Category
})

function Category() {
    const images = Route.useLoaderData()
    const navigate = Route.useNavigate()
    const {toast} = useToast()

    const onDelete = async (id: number, owner: number) => {
        try {
            await CategoryPhoto.delete(String(id), Number(owner))
            await navigate({})
            toast({
                description: "Фотография удалена"
            })
        } catch (e) {
            if (e instanceof Error) toast({
                description: e.message
            })
        }
    }

    if (images.length === 0) {
        return null
    }

    return (
        <div className="h-full overflow-auto">
            {images.length !== 0 && <ImageGrid images={images} onDelete={onDelete}/>}
        </div>
    )
}
