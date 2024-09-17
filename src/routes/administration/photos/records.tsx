import {createFileRoute} from '@tanstack/react-router'
import {RecordImageGrid} from "@/components/RecordImageGrid.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import RecordPhoto, {DRecordPhoto} from "@/api/RecordPhoto.ts";
import {ImagesNotFound} from "@/components/ImagesNotFound.tsx";

export const Route = createFileRoute('/administration/photos/records')({
    loaderDeps: ({ search: { dateFrom, dateTo } }) => ({ dateFrom, dateTo }),
    loader: ({deps: {dateFrom, dateTo}}) => RecordPhoto.all<DRecordPhoto>(dateFrom!, dateTo!),
    component: RecordsPhotos
})

function RecordsPhotos() {
    const {toast} = useToast()
    const navigate = Route.useNavigate()
    const photos = Route.useLoaderData()
    const search = Route.useSearch()

    const onDelete = async (id: number, owner: number) => {
        try {
            await RecordPhoto.delete(String(id), owner)
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
        <RecordImageGrid images={photos} onDelete={onDelete}/>
    )
}
