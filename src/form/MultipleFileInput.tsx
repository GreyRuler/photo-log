import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn, formatDate, formatDateTimeOriginal} from "@/lib/utils.ts";
import {ChangeEvent, Fragment, useEffect, useState} from "react";
import {Camera, Images, X} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useFormContext} from "react-hook-form";
import ExifReader from 'exifreader';
import Compressor from 'compressorjs';
import Spinner from "@/components/Spinner.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import heic2any from "heic2any";
import {nanoid} from "nanoid";
import {Label} from "@/components/ui/label.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

type Props = {
    location: string
}

const MULTIPLE_FILE_INPUT_NAME = "files"

export function MultipleFileInput({location}: Props) {
    const form = useFormContext()
    const {toast} = useToast()
    const DT = new DataTransfer()

    const [watermark, setWatermark] = useState(true)
    const fileRef = form.register(MULTIPLE_FILE_INPUT_NAME, {required: true})
    const files = form.watch(MULTIPLE_FILE_INPUT_NAME) as FileList || undefined;
    const [isProcess, setProcess] = useState(false)

    useEffect(() => {
        files && [...files].forEach((file) => DT.items.add(file))
    }, [files]);

    async function handleFileChange(file: File) {
        const {name: filename} = file
        if (file.type === "image/heic") {
            const mimeType = "image/jpeg"
            const convertedBlobs = await heic2any({
                blob: file, toType: mimeType,
            });
            const blob = Array.isArray(convertedBlobs) ? convertedBlobs[0] : convertedBlobs;
            file = new File([blob], filename, {
                type: mimeType, lastModified: Date.now(),
            })
        }

        const tags = await ExifReader.load(file)
        const date = tags['DateTimeOriginal'] ? formatDateTimeOriginal(tags['DateTimeOriginal'].description) : formatDate(new Date());

        const {lastModified} = file

        return new Promise<File>((resolve) => {
            new Compressor(file, {
                quality: 0.6, success(result) {
                    const newFile = new File([result], filename, {type: result.type, lastModified})
                    resolve(newFile)
                }, drew(context, canvas) {
                    if (watermark) {
                        const fontSize = Math.round(canvas.width / 60);
                        const padding = 20;

                        // Устанавливаем стиль текста
                        context.textAlign = 'right';
                        context.fillStyle = 'white';
                        context.font = `${fontSize}px Arial`;
                        context.shadowColor = 'black';
                        context.shadowBlur = 7;

                        // Добавляем текст (дату и местоположение)
                        context.fillText(date, canvas.width - padding, fontSize + padding);
                        context.fillText(location, canvas.width - padding, fontSize * 2 + padding + 4);

                        // Убираем тень после рисования текста
                        context.shadowBlur = 0;
                    }
                }, error(err) {
                    toast({
                        description: err.message
                    })
                },
            })
        })
    }

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setProcess(true)
        await fileRef.onChange(e);
        if (!e.target.files) return
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files.item(i)
            if (!file) continue
            const newFile = await handleFileChange(file)
            DT.items.add(newFile)
        }
        form.setValue(MULTIPLE_FILE_INPUT_NAME, DT.files)
        setProcess(false)
    }

    return (<Fragment>
        <Label htmlFor="watermark" className="flex text-base gap-4">
            <Checkbox id="watermark" defaultChecked={watermark} onClick={() => setWatermark(prev => !prev)}
                      className="size-6 bg-slate-600 data-[state=checked]:bg-slate-600 data-[state=checked]:text-primary-foreground"/>
            Водяная метка
        </Label>
        <FormField
            control={form.control}
            name={MULTIPLE_FILE_INPUT_NAME}
            render={({field}) => {
                const labelPhoto = nanoid()
                const labelGallery = nanoid()
                return (<FormItem className="flex flex-col items-center gap-2 justify-between space-y-0">
                    <Button type="button" variant="secondary"
                            className="relative h-32 w-full p-0 bg-slate-700 active:bg-slate-900 hover:bg-slate-700">
                        <FormLabel
                            className={cn("w-full h-full text-center text-base whitespace-nowrap flex flex-col items-center justify-center", field.value && "text-emerald-500")}
                            htmlFor={labelPhoto}>
                            {isProcess || (<Fragment>
                                <Camera width="24" height="24"/>
                                <p className="font-bold">Сделать фото</p>
                            </Fragment>)}
                            <FormControl>
                                <Input type="file" className="hidden"
                                       id={labelPhoto}
                                       accept="image/*,.heic,.heif,image/heic,image/heif"
                                       capture="environment"
                                       onChange={onChange}/>
                            </FormControl>
                        </FormLabel>
                        {isProcess && <div className="absolute"><Spinner/></div>}
                    </Button>
                    <Button type="button" variant="secondary"
                            className="relative h-32 w-full p-0 bg-slate-700 active:bg-slate-900 hover:bg-slate-700">
                        <FormLabel
                            className={cn("w-full h-full text-center text-base whitespace-nowrap flex flex-col items-center justify-center", field.value && "text-emerald-500")}
                            htmlFor={labelGallery}>
                            {isProcess || (<Fragment>
                                <Images width="24" height="24"/>
                                <p className="font-bold">Выбрать из медиатеки</p>
                            </Fragment>)}
                            <FormControl>
                                <Input type="file" className="hidden"
                                       multiple={true}
                                       accept="image/*,.heic,.heif,image/heic,image/heif"
                                       id={labelGallery}
                                       onChange={onChange}/>
                            </FormControl>
                        </FormLabel>
                        {isProcess && <div className="absolute"><Spinner/></div>}
                    </Button>
                </FormItem>)
            }}
        />
        {!!files?.length && <div className="h-fit grid grid-cols-3 gap-4">
            {[...files].map((image, index) => (<div className="aspect-square relative" key={nanoid()}>
                <img
                    className="object-cover w-full h-full rounded-md"
                    src={URL.createObjectURL(image)}
                    alt={`Image ${image.name}`}
                />
                <X onClick={() => {
                    DT.items.remove(index)
                    form.setValue(MULTIPLE_FILE_INPUT_NAME, DT.files)
                }}
                   className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-slate-900 rounded-full p-1"
                   size="24"/>
            </div>))}
        </div>}
    </Fragment>)
}
