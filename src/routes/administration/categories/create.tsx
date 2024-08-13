import { createFileRoute } from '@tanstack/react-router'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import Form from "@/form/category/Form.tsx";
import Category from "@/api/Category.ts";
import {formSchema} from "@/form/category/formShema.ts";
import Page from "@/form/Page.tsx";

export const Route = createFileRoute('/administration/categories/create')({
  component: CategoryCreate
})

function CategoryCreate() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        Category.create(values)
    }

    return (
        <Page title="Форма создания пользователя">
            <FormProvider {...form}>
                <Form onSubmit={onSubmit}/>
            </FormProvider>
        </Page>
    )
}
