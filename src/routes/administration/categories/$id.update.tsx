import {createFileRoute} from '@tanstack/react-router'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/form/category/formShema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import Form from "@/form/category/Form.tsx";
import Category, {TCategory} from "@/api/Category.ts";
import Page from "@/form/Page.tsx";

export const Route = createFileRoute('/administration/categories/$id/update')({
    loader: ({params: {id}}) => Category.item<TCategory>(id),
    component: CategoriesUpdate
})

function CategoriesUpdate() {
    const data = Route.useLoaderData()
    const {id} = Route.useParams()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data,
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        Category.update(id, values)
    }

    return (
        <Page title="Форма обновления категории">
            <FormProvider {...form}>
                <Form onSubmit={onSubmit}/>
            </FormProvider>
        </Page>
    )
}
