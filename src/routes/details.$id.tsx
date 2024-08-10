import {createFileRoute} from '@tanstack/react-router'
import {Record} from "@/api/Record.ts";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Camera} from "lucide-react";
import {Fragment, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {formSchema} from "@/form/record/formShema.ts";

export const Route = createFileRoute('/details/$id')({
    loader: ({params: {id}}) => Record.item(id),
    component: Details
})

function Details() {
    const {id, name, count, innerCount, k, timeArrival, timeEnd, unit, comment} = Route.useLoaderData()
    const max = count * k - innerCount

    const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
        resolver: zodResolver(formSchema(max)),
        defaultValues: {
            count: 1,
            file: undefined,
        },
    })

    const [backgroundImage, setBackgroundImage] = useState<string | ArrayBuffer | null | undefined>(null);
    const fileRef = form.register('file', {required: true})

    function handleFileChange(fileList: FileList) {
        const file = fileList[0];
        if (!file) {
            setBackgroundImage(null)
            return
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBackgroundImage(e.target?.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function onSubmit(formData: z.infer<ReturnType<typeof formSchema>>) {
        Record.photo(id, formData)
    }

    return (
        <div className="h-full overflow-auto">
            <div className="p-2 bg-slate-700 text-center">{name}</div>
            <div className="m-4 p-4 bg-slate-900">
                <p>Загружено на данный момент: <span className="text-emerald-500 font-bold">{innerCount}</span></p>
                <p>Необходимо загрузить: <span className="text-emerald-500 font-bold">{max}</span></p>
                <p>Дата, когда можно найти: <span className="text-emerald-500 font-bold">{timeArrival}</span></p>
                <p>Крайняя дата загрузки: <span className="text-emerald-500 font-bold">{timeEnd}</span></p>
                <p>Единица измерения: <span className="text-emerald-500 font-bold">{unit}</span></p>
                <p>Комментарий: <span className="text-emerald-500 font-bold">{comment}</span></p>
            </div>
            <div className="m-4 p-4 bg-slate-900">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="count"
                            render={({field}) => (
                                <FormItem className="flex items-center gap-2 justify-between space-y-0">
                                    <FormLabel className="text-base whitespace-nowrap">
                                        Количество объектов на фото
                                    </FormLabel>
                                    <FormControl>
                                        <Input className="text-right w-14 m-0 text-base" type="number" step="1" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="file"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-center gap-2 justify-between space-y-0">
                                    <Button type="button" variant="secondary"
                                            className="h-32 w-full p-0 bg-slate-700 active:bg-slate-900 hover:bg-slate-700"
                                            style={{
                                                backgroundImage: `url(${backgroundImage})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                    >
                                        <FormLabel className={cn(
                                            "w-full h-full text-center text-base whitespace-nowrap flex flex-col items-center justify-center",
                                            field.value && "text-emerald-500"
                                        )}>
                                            {!!backgroundImage || (
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
                                    </Button>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="default"
                                className="font-bold text-emerald-500 w-full text-base border focus:bg-emerald-500 focus:text-white border-emerald-500">Отправить</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
