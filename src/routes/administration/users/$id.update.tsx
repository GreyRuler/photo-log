import { createFileRoute } from '@tanstack/react-router'

import {formSchema} from "@/form/user/formSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import User, {TUser} from "@/api/User.ts";
import Form from "@/form/user/Form.tsx";
import Page from "@/form/Page.tsx";

export const Route = createFileRoute('/administration/users/$id/update')({
    loader: ({params: {id}}) => User.item<TUser>(id),
    component: UserUpdate,
})

function UserUpdate() {
    const data = Route.useLoaderData()
    const navigate = Route.useNavigate()
    const {id} = Route.useParams()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data,
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await User.update(id, values)
        await navigate({to: "/administration/users"})
    }

    return (
        <Page title="Форма обновления пользователя">
            <FormProvider {...form}>
                <Form onSubmit={onSubmit}/>
            </FormProvider>
        </Page>
    )
}
