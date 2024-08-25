import {DCategoryPhoto} from "@/api/CategoryPhoto.ts";
import {Image} from "@/components/Image"
import {nanoid} from "nanoid";

type Props = {
    images: DCategoryPhoto[]
    onDelete: (id: number, owner: number) => void
}

export function CategoryImageGrid({images, onDelete}: Props) {
    return (
        <div className="m-4 p-4 bg-slate-900">
            <div className="h-full overflow-auto">
                <div className="h-fit flex flex-wrap">
                    {images.map((image) => (
                        <Image key={nanoid()} image={image} onDelete={onDelete}>
                            <div className="text-xl">
                                Данная фотография располагается в категории {image.category.name}
                            </div>
                        </Image>
                    ))}
                </div>
            </div>
        </div>
    )
}
