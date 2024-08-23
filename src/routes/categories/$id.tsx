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
    const {id: owner} = Route.useParams()
    const {toast} = useToast()

    const onDelete = async (id: number) => {
        try {
            await CategoryPhoto.delete(String(id), Number(owner))
            await navigate({})
            toast({
                description: "Фотография удалена"
            })
        } catch(e) {
            if (e instanceof Error) toast({
                description: e.message
            })
        }
    }

    return (
        <div className="h-full overflow-auto">
            <div className="m-4 p-4 bg-slate-900">
                <ImageGrid images={images} onDelete={onDelete}/>
            </div>
        </div>
    )
}
