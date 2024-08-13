import { createFileRoute } from '@tanstack/react-router'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/form/notification/formShema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import Page from "@/form/Page.tsx";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import Form from "@/form/notification/Form.tsx";
import Notification from "@/api/Notification.ts";

export const Route = createFileRoute('/administration/notifications/create')({
  component: Create
})

function Create() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        Notification.create(values)
    }

    return (
        <Page title="Форма создания пользователя">
            <FormProvider {...form}>
                <Form onSubmit={onSubmit}/>
            </FormProvider>
        </Page>
    )
}
