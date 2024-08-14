import {createFileRoute} from '@tanstack/react-router'
import Category, {TCategory} from "@/api/Category.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {nanoid} from "nanoid";
import {Fragment, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {Camera} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import axiosClient from "@/api/axios-client.ts";

export const Route = createFileRoute('/photos/upload')({
    loader: () => Category.list<TCategory>(),
    component: Upload
})

function Upload() {
    const data = Route.useLoaderData()
    const categories = data.map((item) => item.name)

    if (categories.length === 0) {
        return "Нет категорий"
    }

    const formSchema = z.object({
        location: z.string(),
        category: z.enum([categories[0], ...categories.slice(1)] as [string, ...string[]], {
            required_error: "Необходимо выбрать категорию",
        }),
        file: z.instanceof(FileList)
            .refine((file) => file?.length > 0),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: "",
            category: categories[0],
            file: undefined
        }
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

    function onSubmit(data: z.infer<typeof formSchema>) {
        axiosClient.postForm('/photo/upload', data)
    }

    return (
        <div className="h-full overflow-auto flex p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="m-auto space-y-6">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({field}) => (
                            <FormItem className="space-y-6">
                                <FormLabel className="text-base">Выберите категорию</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-wrap gap-y-9"
                                    >
                                        {categories.map((item) => {
                                            const id = nanoid()
                                            return (
                                                <FormItem key={id}>
                                                    <FormControl>
                                                        <Fragment>
                                                            <RadioGroupItem value={item} id={id}
                                                                            className="peer sr-only"/>
                                                            <Label
                                                                htmlFor={id}
                                                                className="w-full h-full text-base rounded-md bg-slate-700 p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-slate-900 [&:has([data-state=checked])]:bg-slate-900 peer-data-[state=checked]:text-accent [&:has([data-state=checked])]:text-accent"
                                                            >
                                                                {item}
                                                            </Label>
                                                        </Fragment>
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        })}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="h-12 text-base" placeholder="Локация" {...field} />
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
                    <Button type="submit">Отправить</Button>
                </form>
            </Form>
        </div>
    )
}
