import {createFileRoute} from '@tanstack/react-router'
import {createUserSchema} from "@/form/user/formSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import User from "@/api/User.ts";
import Page from "@/form/Page.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {AxiosError} from "axios";
import FormCreate from "@/form/user/FormCreate.tsx";

export const Route = createFileRoute('/administration/users/create')({
    component: UserCreate
})

function UserCreate() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof createUserSchema>>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            isAdmin: false,
        },
    })

    async function onSubmit(values: z.infer<typeof createUserSchema>) {
        try {
            await User.create(values)
            toast({
                description: "Учётная запись создана",
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
        <Page title="Форма создания пользователя">
            <FormProvider {...form}>
                <FormCreate onSubmit={onSubmit} isUpdate={false}/>
            </FormProvider>
        </Page>
    )
}
