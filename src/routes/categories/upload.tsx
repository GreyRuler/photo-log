import {createFileRoute} from '@tanstack/react-router'
import Category, {TCategory} from "@/api/Category.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import {formSchema, FormSchemaPhoto} from "@/form/photos/formSchema.ts";
import {Form} from "@/form/photos/Form.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {CategoriesNotFound} from "@/components/CategoriesNotFound.tsx";
import {useSettings} from "@/context/settings.tsx";
import CategoryPhoto from "@/api/CategoryPhoto.ts";

export const Route = createFileRoute('/categories/upload')({
    loader: () => Category.list<TCategory>(),
    component: Upload
})

function Upload() {
    const {settings} = useSettings()
    const data = Route.useLoaderData()
    const {toast} = useToast()

    if (data.length === 0) {
        return <CategoriesNotFound/>
    }

    const form = useForm<FormSchemaPhoto>({
        resolver: zodResolver(formSchema(data.map(item => String(item.id)))),
        defaultValues: {
            category: String(data[0].id),
            files: undefined
        }
    })

    async function onSubmit(data: FormSchemaPhoto) {
        try {
            await CategoryPhoto.create(data, Number(data.category))
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
        <div className="h-full overflow-auto flex p-8">
            <FormProvider {...form}>
                <Form categories={data} location={settings?.event_location ?? ""} onSubmit={onSubmit}/>
            </FormProvider>
        </div>
    )
}
