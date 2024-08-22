import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn, dataURLtoFile, formatDateTimeOriginal} from "@/lib/utils.ts";
import {Fragment, useState} from "react";
import {Camera} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useFormContext} from "react-hook-form";
import ExifReader from 'exifreader';
import {
    Canvas,
    FabricImage,
    FabricText, Rect,
} from 'fabric';
import Spinner from "@/components/Spinner.tsx";

type Props = {
    location: string
}

export function FileInput({location}: Props) {
    const form = useFormContext()
    const [backgroundImage, setBackgroundImage] = useState<string | ArrayBuffer | null | undefined>(null);
    const fileRef = form.register('file', {required: true})
    const [isProcess, setProcess] = useState(false)

    async function handleFileChange(fileList: FileList) {
        setProcess(true)
        const file = fileList[0];
        if (!file) {
            setBackgroundImage(null)
            return
        }
        const reader = new FileReader();
        reader.onload = async (e) => {
            const imgSrc = e.target?.result as string;
            const tags = await ExifReader.load(file);
            const imageDate = tags['DateTimeOriginal'] ? formatDateTimeOriginal(tags['DateTimeOriginal'].description) : 'Дата неизвестна';

            const processedImage = await processImage(imgSrc, imageDate, location);

            setBackgroundImage(processedImage);
            form.setValue('file', dataURLtoFile(processedImage, file.name));
            setProcess(false)
        };
        reader.readAsDataURL(file);
    }

    async function processImage(imageSrc: string, date: string, location: string): Promise<string> {
        return new Promise((resolve) => {
            FabricImage.fromURL(imageSrc).then((img) => {
                const canvas = new Canvas(undefined, {width: img.width, height: img.height})
                img.scaleToWidth(canvas.width!);
                canvas.add(img);

                const text = `${date}\n${location}`
                const fontSize = Math.round(canvas.width / 60)
                const padding = 10
                // Добавление текста
                const fabricText = new FabricText(text, {
                    left: canvas.width! - 210,
                    top: 30,
                    fontSize: fontSize,
                    fill: 'black',
                });

                const textHeight = (text.split('\n').length * fontSize + 1) + padding;

                const rectHeight = textHeight + padding;

                // Добавление прямоугольника
                const rect = new Rect({
                    left: 0,
                    top: 0,
                    fill: 'white',
                    width: canvas.width!,
                    height: rectHeight,
                });
                canvas.add(rect);

                fabricText.set({
                    left: padding,
                    top: padding,
                });
                canvas.add(fabricText);

                img.set({
                    top: rectHeight,
                });

                // Экспорт изображения
                const dataUrl = canvas.toDataURL();
                resolve(dataUrl);
            })
        })
    }

    return (
        <FormField
            control={form.control}
            name="file"
            render={({field}) => (
                <FormItem className="flex flex-col items-center gap-2 justify-between space-y-0">
                    <Button type="button" variant="secondary"
                            className="relative h-32 w-full p-0 bg-slate-700 active:bg-slate-900 hover:bg-slate-700"
                            style={{
                                backgroundImage: `url(${field.value && backgroundImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "top",
                                backgroundRepeat: "no-repeat",
                            }}
                    >
                        <FormLabel className={cn(
                            "w-full h-full text-center text-base whitespace-nowrap flex flex-col items-center justify-center",
                            field.value && "text-emerald-500"
                        )}>
                            {!!(field.value && backgroundImage) || isProcess || (
                                <Fragment>
                                    <Camera width="24" height="24"/>
                                    <p className="font-bold">Загрузить фото</p>
                                </Fragment>
                            )}
                            <FormControl>
                                <Input {...fileRef} type="file" className="hidden" accept="image/*"
                                       onChange={(e) => {
                                           fileRef.onChange(e)
                                           e.target.files && handleFileChange(e.target.files)
                                       }}/>
                            </FormControl>
                        </FormLabel>
                        {isProcess && <div className="absolute"><Spinner/></div>}
                    </Button>
                </FormItem>
            )}
        />
    )
}
