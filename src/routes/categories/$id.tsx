import {createFileRoute} from '@tanstack/react-router'
import CategoryPhoto, {DCategoryPhoto} from "@/api/CategoryPhoto.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {CategoryImageGrid} from "@/components/CategoryImageGrid.tsx";

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
            {images.length !== 0 && <CategoryImageGrid images={images} onDelete={onDelete}/>}
        </div>
    )
}
