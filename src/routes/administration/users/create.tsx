import {createFileRoute} from '@tanstack/react-router'
import {formSchema} from "@/form/user/formShema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import User from "@/api/User.ts";
import Form from "@/form/user/Form.tsx";
import Page from "@/form/Page.tsx";

export const Route = createFileRoute('/administration/users/create')({
    component: UserCreate
})

function UserCreate() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            isAdmin: false,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        User.create(values)
    }

    return (
        <Page title="Форма создания категории">
            <FormProvider {...form}>
                <Form onSubmit={onSubmit}/>
            </FormProvider>
        </Page>
    )
}