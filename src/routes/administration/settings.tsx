import Page from '@/form/Page'
import {createFileRoute} from '@tanstack/react-router'
import {useForm} from "react-hook-form";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {formSchema, SettingsSchema} from "@/form/settings/formSchema.ts";
import Form from "@/form/settings/Form.tsx";
import Settings from "@/api/Settings"
import {FormSheetSync} from "@/form/settings/FormSheetSync.tsx";
import Sheet from "@/api/Sheet.ts";
import {formSchema as formSchemaSheetSync, FormSchemaSheetSync} from "@/form/settings/formSchemaSheetSync.ts";
import {useToast} from "@/components/ui/use-toast.ts";

export const Route = createFileRoute('/administration/settings')({
    loader: () => Settings.get(),
    component: Index
})

function Index() {
    const { toast } = useToast();
    const data = Route.useLoaderData()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: data
    })

    function onSubmit(values: SettingsSchema) {
        Settings.update(values)
            .then(() => {
                toast({
                    description: "Настройки обновлены",

                })
            })
    }

    const formSheetSync = useForm({
        resolver: zodResolver(formSchemaSheetSync),
        defaultValues: data
    })

    function onSubmitSheetSync({sheet_api}: FormSchemaSheetSync) {
        Sheet.collect(sheet_api)
            .then((response) => {
                const {data} = response
                toast({
                    description: data.message
                })
            })
    }

    return (
        <Page title="Настройки">
            <div className="space-y-8">
                <FormProvider {...formSheetSync}>
                    <FormSheetSync onSubmit={onSubmitSheetSync}/>
                </FormProvider>
                <FormProvider {...form}>
                    <Form onSubmit={onSubmit}/>
                </FormProvider>
            </div>
        </Page>
    )
}
