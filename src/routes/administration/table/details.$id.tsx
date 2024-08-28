import {createFileRoute} from '@tanstack/react-router'
import {Record, TExpense} from "@/api/Record.ts";
import {RecordImageGrid} from "@/components/RecordImageGrid.tsx";
import RecordPhoto from "@/api/RecordPhoto.ts";
import {useToast} from "@/components/ui/use-toast.ts";

export const Route = createFileRoute('/administration/table/details/$id')({
    loader: ({params: {id}}) => Record.item<TExpense>(id),
    component: Details
})

function Details() {
    const {name, count, innerCount, k, timeArrival, timeEnd, unit, comment, location, photos} = Route.useLoaderData()
    const max = Math.ceil(count * k - innerCount)
    const {toast} = useToast()
    const navigate = Route.useNavigate()

    const onDelete = async (id: number, owner: number) => {
        try {
            await RecordPhoto.delete(String(id), owner)
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
            <div className="p-2 bg-slate-700 text-center">{name}</div>
            <div className="m-4 p-4 bg-slate-900">
                <p>Местоположение: <span className="text-emerald-500 font-bold">{location}</span></p>
                <p>Реальное кол-во позиций: <span className="text-emerald-500 font-bold">{count}</span></p>
                <p>Загружено на данный момент: <span className="text-emerald-500 font-bold">{innerCount}</span></p>
                <br/>
                <p>Необходимо загрузить: <span className="text-emerald-500 font-bold">{max}</span></p>
                <br/>
                <p>Дата, когда можно найти: <span className="text-emerald-500 font-bold">{timeArrival}</span></p>
                <p>Крайняя дата загрузки: <span className="text-emerald-500 font-bold">{timeEnd}</span></p>
                <p>Единица измерения: <span className="text-emerald-500 font-bold">{unit}</span></p>
                <p>Комментарий: <span className="text-emerald-500 font-bold">{comment}</span></p>
            </div>
            {photos.length !== 0 && <RecordImageGrid images={photos} onDelete={onDelete}/>}
        </div>
    )
}
