import { createFileRoute } from '@tanstack/react-router'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import Form from "@/form/category/Form.tsx";
import Category from "@/api/Category.ts";
import {formSchema} from "@/form/category/formSchema.ts";
import Page from "@/form/Page.tsx";
import {useToast} from "@/components/ui/use-toast.ts";

export const Route = createFileRoute('/administration/categories/create')({
  component: CategoryCreate
})

function CategoryCreate() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await Category.create(values)
        toast({
            description: "Категория создана",
        })
    }

    return (
        <Page title="Форма создания категории">
            <FormProvider {...form}>
                <Form onSubmit={onSubmit}/>
            </FormProvider>
        </Page>
    )
}
