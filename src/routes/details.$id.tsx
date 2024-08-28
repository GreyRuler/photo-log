import {createFileRoute, useRouter} from '@tanstack/react-router'
import {Record, TExpense} from "@/api/Record.ts";
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
import {Minus, Plus} from "lucide-react";
import {formSchema} from "@/form/recordPhotos/formSchema.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {Slider} from "@/components/ui/slider.tsx";
import {FileInput} from "@/form/FileInput.tsx";
import {ButtonSubmit} from "@/form/ButtonSubmit.tsx";
import RecordPhoto from "@/api/RecordPhoto.ts";

export const Route = createFileRoute('/details/$id')({
    loader: ({params: {id}}) => Record.item<TExpense>(id),
    component: Details
})

function Details() {
    const {id, name, count, innerCount, k, timeArrival, timeEnd, unit, comment, location} = Route.useLoaderData()
    const max = Math.ceil(count * k - innerCount)
    const min = 0
    const {toast} = useToast()
    const router = useRouter()

    const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
        resolver: zodResolver(formSchema(max)),
        defaultValues: {
            count: min,
            file: undefined,
        },
    })

    async function onSubmit(formData: z.infer<ReturnType<typeof formSchema>>) {
        try {
            await RecordPhoto.create(formData, id)
            await router.invalidate()
            form.reset()
            toast({
                description: "Фотография загружена",
            })
        } catch (e) {
            toast({
                description: "Фотография повреждена",
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
            <div className="m-4 p-4 bg-slate-900">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="count"
                            render={({field}) => {
                                return (
                                    <FormItem className="flex flex-col items-center gap-2 justify-between">
                                        <FormLabel className="text-base whitespace-nowrap">
                                            Количество объектов на фото
                                        </FormLabel>
                                        <FormMessage/>
                                        <div className="flex">
                                            <Button type="button" disabled={field.value === min}
                                                    className="p-2 bg-slate-800"
                                                    onClick={() => form.setValue("count", --field.value)}>
                                                <Minus/>
                                            </Button>
                                            <FormControl>
                                                <Input className="text-center w-14 m-0 text-base border-none"
                                                       type="number"
                                                       step="1" {...field}/>
                                            </FormControl>
                                            <Button type="button" disabled={field.value === max}
                                                    className="p-2 bg-slate-800"
                                                    onClick={() => form.setValue("count", ++field.value)}>
                                                <Plus/>
                                            </Button>
                                        </div>
                                        <Slider
                                            defaultValue={[min]}
                                            value={[field.value]}
                                            step={1}
                                            min={min}
                                            max={max}
                                            onValueChange={(value) => form.setValue("count", value[0])}
                                        />
                                        <div className="w-full flex justify-between px-1.5">
                                            <span className="text-muted-foreground">{min}</span>
                                            <span className="text-muted-foreground">{max}</span>
                                        </div>
                                    </FormItem>
                                )
                            }}
                        />
                        <FileInput location={location}/>
                        <ButtonSubmit/>
                    </form>
                </Form>
            </div>
        </div>
    )
}
