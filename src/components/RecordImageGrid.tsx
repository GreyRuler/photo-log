import {DRecordPhoto} from "@/api/RecordPhoto.ts"
import {Image} from "@/components/Image"
import {nanoid} from "nanoid";

type Props = {
    images: DRecordPhoto[]
    onDelete: (id: number, owner: number) => void
}

export function RecordImageGrid({images, onDelete}: Props) {
    return (
        <div className="m-4 p-4 bg-slate-900">
            <div className="h-full overflow-auto">
                <div className="h-fit flex flex-wrap">
                    {images.map((image) => {
                        const {record} = image
                        return <Image key={nanoid()} image={image} onDelete={onDelete}>
                            <div className="h-full">
                                <div className="m-4 p-4 bg-slate-900">
                                    <p>Количество объектов на фото: <span className="text-emerald-500 font-bold">{image.count}</span></p>
                                    <p>Идентификатор объекта на фото: <span className="text-emerald-500 font-bold">{record.id}</span></p>
                                    <p>Объект на фото: <span className="text-emerald-500 font-bold">{record.name}</span></p>
                                    <p>Ответственный от подрядчика: <span className="text-emerald-500 font-bold">{record.contractor}</span></p>
                                    <p>Комментарий: <span className="text-emerald-500 font-bold">{record.comment}</span></p>
                                </div>
                            </div>
                        </Image>
                    })}
                </div>
            </div>
        </div>
    )
}
