import {nanoid} from 'nanoid'
import {DRecordPhoto} from "@/api/RecordPhoto.ts"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button.tsx";
import {DCategoryPhoto} from "@/api/CategoryPhoto.ts";

type Props = {
    images: DRecordPhoto[] | DCategoryPhoto[]
    onDelete: (id: number, owner: number) => void
}

export function ImageGrid({images, onDelete}: Props) {
    const onDownload = (path: string) => {
        window.location.href = `/download/${encodeURIComponent(encodeURIComponent(path))}`;
    }

    return (
        <div className="m-4 p-4 bg-slate-900">
            <div className="h-full overflow-auto">
                <div className="h-fit flex flex-wrap">
                    {images.map((image) => (
                        <Drawer key={nanoid()}>
                            <DrawerTrigger asChild>
                                <div className="w-1/3 p-1">
                                    <div className="aspect-square relative">
                                        <img
                                            className="object-cover w-full h-full border border-white"
                                            src={`/images/${encodeURIComponent(encodeURIComponent(image.path))}`}
                                            alt={`Image ${image.id}`}
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </DrawerTrigger>
                            <DrawerContent className="text-white bg-primary border-none h-svh">
                                <DrawerHeader>
                                    <DrawerTitle>Просмотр фотографии</DrawerTitle>
                                    <DrawerDescription></DrawerDescription>
                                </DrawerHeader>
                                <div className="flex-1 overflow-hidden">
                                    <img
                                        className="object-contain h-full w-full"
                                        src={`/images/${encodeURIComponent(encodeURIComponent(image.path))}`}
                                        alt={`Image ${image.id}`}
                                        loading="lazy"
                                    />
                                </div>
                                <DrawerFooter className="pt-2 grid grid-cols-2">
                                    <DrawerClose asChild>
                                        <Button
                                            className="bg-slate-900 font-bold text-red-500 w-full text-base border focus:bg-red-500 focus:text-white border-red-900"
                                            variant="outline" onClick={() => onDelete(image.id, image.owner)}>Удалить</Button>
                                    </DrawerClose>
                                    <Button
                                        className="bg-slate-900 font-bold text-blue-500 w-full text-base border focus:bg-blue-500 focus:text-white border-blue-500"
                                        variant="outline" onClick={() => onDownload(image.path)}>Скачать</Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    ))}
                </div>
            </div>
        </div>
    )
}
