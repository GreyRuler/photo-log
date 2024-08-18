import {createFileRoute} from '@tanstack/react-router'
import Category, {TCategory} from "@/api/Category.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import {formSchema, FormSchemaPhoto} from "@/form/photos/formSchema.ts";
import {Form} from "@/form/photos/Form.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import Photo from "@/api/Photo.ts";

export const Route = createFileRoute('/photos/upload')({
    loader: () => Category.list<TCategory>(),
    component: Upload
})

function Upload() {
    const data = Route.useLoaderData()
    const {toast} = useToast()
    const categories = data.map((item) => item.name)

    if (categories.length === 0) {
        return "Нет категорий"
    }

    const form = useForm<FormSchemaPhoto>({
        resolver: zodResolver(formSchema(categories)),
        defaultValues: {
            category: categories[0],
            file: undefined
        }
    })

    async function onSubmit(data: FormSchemaPhoto) {
        await Photo.upload(data)
        form.reset()
        toast({
            description: "Фотография загружена",
        })
    }

    return (
        <div className="h-full overflow-auto flex p-8">
            <FormProvider {...form}>
                <Form categories={categories} onSubmit={onSubmit}/>
            </FormProvider>
        </div>
    )
}
