import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn, formatDate, formatDateTimeOriginal} from "@/lib/utils.ts";
import {Fragment, useState} from "react";
import {Camera} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useFormContext} from "react-hook-form";
import ExifReader from 'exifreader';
import Compressor from 'compressorjs';
import Spinner from "@/components/Spinner.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import heic2any from "heic2any";

type Props = {
    location: string
}

export function FileInput({location}: Props) {
    const form = useFormContext()
    const {toast} = useToast()
    const [backgroundImage, setBackgroundImage] = useState<string | ArrayBuffer | null | undefined>(null);
    const fileRef = form.register('file', {required: true})
    const [isProcess, setProcess] = useState(false)

    async function handleFileChange(fileList: FileList) {
        setProcess(true)
        setBackgroundImage(null)
        let file = fileList[0];
        if (!file) return
        const {name: filename} = file
        if (file.type === "image/heic") {
            const mimeType = "image/jpeg"
            const convertedBlobs = await heic2any({
                blob: fileList[0],
                toType: mimeType,
            });
            const blob = Array.isArray(convertedBlobs) ? convertedBlobs[0] : convertedBlobs;
            file = new File([blob], filename, {
                type: mimeType,
                lastModified: Date.now(),
            })
        }

        const tags = await ExifReader.load(file)
        const date = tags['DateTimeOriginal'] ? formatDateTimeOriginal(tags['DateTimeOriginal'].description) : formatDate(new Date());

        toast({
            description: `Дата для фото ${date}`
        })

        const {lastModified} = file

        new Compressor(file, {
            quality: 0.6,
            success(result) {
                const newFile = new File([result], filename, { type: result.type, lastModified })
                setBackgroundImage(URL.createObjectURL(result));
                form.setValue('file', newFile);
                setProcess(false)
            },
            drew(context, canvas) {
                const fontSize = Math.round(canvas.width / 60);
                const padding = 10;
                const lineHeight = fontSize + 4;
                const textHeight = lineHeight * 2 + padding * 2;

                // Устанавливаем цвет фона для текста
                context.fillStyle = 'white';
                context.fillRect(0, 0, canvas.width, textHeight);

                // Устанавливаем стиль текста
                context.textAlign = 'right';
                context.fillStyle = 'black';
                context.font = `${fontSize}px Arial`;

                // Добавляем текст (дату и местоположение)
                context.fillText(date, canvas.width - padding, fontSize + padding);
                context.fillText(location, canvas.width - padding, fontSize * 2 + padding + 4);
            },
            error(err) {
                toast({
                    description: err.message
                })
            },
        });
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
                                <Input {...fileRef} type="file" className="hidden" accept="image/*,.heic,.heif,image/heic,image/heif"
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
