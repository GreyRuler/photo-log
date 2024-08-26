import {createFileRoute} from '@tanstack/react-router'
import {updateUserSchema} from "@/form/user/formSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import User, {TUser} from "@/api/User.ts";
import FormUpdate from "@/form/user/FormUpdate.tsx";
import Page from "@/form/Page.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {AxiosError} from "axios";

export const Route = createFileRoute('/administration/users/$id/update')({
    loader: ({params: {id}}) => User.item<TUser>(id),
    component: UserUpdate,
})

function UserUpdate() {
    const {toast} = useToast();
    const data = Route.useLoaderData()
    const navigate = Route.useNavigate()
    const {id} = Route.useParams()
    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: data,
    })

    async function onSubmit(values: z.infer<typeof updateUserSchema>) {
        try {
            await User.update(id, values)
            await navigate({to: "/administration/users"})
            toast({
                description: "Учётная запись обновлена",
            })
        } catch (e) {
            if (e instanceof AxiosError) {
                toast({
                    description: e.response?.data.message,
                })
            }
        }
    }

    return (
        <Page title="Форма обновления пользователя">
            <FormProvider {...form}>
                <FormUpdate onSubmit={onSubmit} isUpdate={true}/>
            </FormProvider>
        </Page>
    )
}
