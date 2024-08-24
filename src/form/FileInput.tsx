import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn, formatDateTimeOriginal} from "@/lib/utils.ts";
import {Fragment, useState} from "react";
import {Camera} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useFormContext} from "react-hook-form";
import ExifReader from 'exifreader';
import Compressor from 'compressorjs';
import Spinner from "@/components/Spinner.tsx";
import {useToast} from "@/components/ui/use-toast.ts";

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
        const file = fileList[0];
        if (!file) {
            setBackgroundImage(null)
            return
        }

        new Compressor(file, {
            quality: 0.6,
            success(result) {
                // const newFile = new File([result], file.name, { type: result.type })
                // form.setValue('file', newFile);
                // setProcess(false)
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const imgSrc = e.target?.result as string;
                    const tags = await ExifReader.load(file);
                    const imageDate = tags['DateTimeOriginal'] ? formatDateTimeOriginal(tags['DateTimeOriginal'].description) : 'Дата неизвестна';

                    try {
                        const processedImage = await processImage(imgSrc, imageDate, location);
                        setBackgroundImage(URL.createObjectURL(processedImage));
                        form.setValue('file', new File([processedImage], file.name, { type: file.type }));
                        setProcess(false)
                    } catch (e) {
                        if (e instanceof Error) toast({
                            description: e.message
                        })
                    }
                };
                reader.readAsDataURL(result);
            },
            error(err) {
                toast({
                    description: err.message
                })
            },
        });
    }

    async function processImage(imageSrc: string, date: string, location: string): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const fontSize = Math.round(img.width / 60);
                const padding = 10;
                const lineHeight = fontSize + 4;
                const textHeight = lineHeight * 2 + padding * 2;
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height + textHeight;

                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, canvas.width, textHeight);
                    ctx.textAlign = 'right';
                    ctx.fillStyle = 'black';
                    ctx.font = `${fontSize}px Arial`;
                    ctx.fillText(date, canvas.width - padding, fontSize + padding);
                    ctx.fillText(location, canvas.width - padding, fontSize * 2 + padding + 4);
                    ctx.drawImage(img, 0, textHeight);
                    canvas.toBlob((blob) => {
                        if (blob === null) reject(new Error("Ошибка обработки фотографии"))
                        resolve(blob!);
                    }, 'image/jpeg');
                    // resolve(canvas.toDataURL('image/jpeg'));
                }
            };
            img.src = imageSrc;
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
