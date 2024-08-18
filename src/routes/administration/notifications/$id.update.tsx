import {createFileRoute} from '@tanstack/react-router'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/form/notification/formSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import Notification, {TNotification} from "@/api/Notification.ts";
import Page from "@/form/Page.tsx";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import Form from "@/form/notification/Form.tsx";

export const Route = createFileRoute('/administration/notifications/$id/update')({
    loader: ({params: {id}}) => Notification.item<TNotification>(id),
    component: Update
})

function Update() {
    const data = Route.useLoaderData()
    const navigate = Route.useNavigate()
    const {id} = Route.useParams()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data,
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await Notification.update(id, values)
        await navigate({to: "/administration/notifications"})
    }

    return (
        <Page title="Форма обновления уведомления">
            <FormProvider {...form}>
                <Form onSubmit={onSubmit}/>
            </FormProvider>
        </Page>
    )
}
