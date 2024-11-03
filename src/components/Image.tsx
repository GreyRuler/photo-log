import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DRecordPhoto} from "@/api/RecordPhoto.ts";
import {DCategoryPhoto} from "@/api/CategoryPhoto.ts";
import {ReactNode} from "react";
import {cn} from "@/lib/utils.ts";

type Props = {
    image: DRecordPhoto | DCategoryPhoto
    onDelete?: (id: number, owner: number) => void
    children: ReactNode
};

export function Image({image, onDelete, children}: Props) {
    const onDownload = (path: string) => {
        window.location.href = `/download/${encodeURIComponent(encodeURIComponent(path))}`;
    }

    return (
        <Drawer>
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
                    <DrawerTitle className="text-center sm:text-center">Просмотр фотографии</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <Carousel className="flex-1 overflow-hidden">
                    <CarouselContent className="h-full">
                        <CarouselItem>
                            <img
                                className="object-contain h-full w-full"
                                src={`/images/${encodeURIComponent(encodeURIComponent(image.path))}`}
                                alt={`Image ${image.id}`}
                                loading="lazy"
                            />
                        </CarouselItem>
                        <CarouselItem>{children}</CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious variant="outline" className="bg-slate-900"/>
                    <CarouselNext variant="outline" className="bg-slate-900"/>
                </Carousel>
                <DrawerFooter className={cn(
                    "pt-2",
                    onDelete && "grid grid-cols-2"
                )}>
                    {onDelete && <DrawerClose asChild>
                        <Button
                            className="bg-slate-900 font-bold text-red-500 w-full text-base border focus:bg-red-500 focus:text-white border-red-900"
                            variant="outline" onClick={() => onDelete(image.id, image.owner)}>Удалить</Button>
                    </DrawerClose>}
                    <Button
                        className="bg-slate-900 font-bold text-blue-500 w-full text-base border focus:bg-blue-500 focus:text-white border-blue-500"
                        variant="outline" onClick={() => onDownload(image.path)}>Скачать</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
