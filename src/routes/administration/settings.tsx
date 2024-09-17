import Page from '@/form/Page'
import {createFileRoute, Link} from '@tanstack/react-router'
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
import {useSettings} from "@/context/settings.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";

export const Route = createFileRoute('/administration/settings')({
    loader: () => Settings.get(),
    component: Index
})

function Index() {
    const {toast} = useToast();
    const settingsContext = useSettings()
    const data = Route.useLoaderData()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: data
    })

    async function onSubmit(values: SettingsSchema) {
        await Settings.update(values)
        toast({
            description: "Настройки обновлены",
        })
        const settings = await Settings.get()
        await settingsContext.notify(settings)
    }

    const formSheetSync = useForm({
        resolver: zodResolver(formSchemaSheetSync),
        defaultValues: data
    })

    async function onSubmitSheetSync({sheet_api}: FormSchemaSheetSync) {
        const {data} = await Sheet.collect(sheet_api)
        toast({
            description: data.message
        })
        const settings = await Settings.get()
        await settingsContext.notify(settings)
    }

    async function onSubmitTruncateRecords() {
        const {data} = await Settings.truncateRecords()
        toast({
            description: data.message
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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="flex flex-col h-fit w-full">
                            <span>Удалить данные</span>
                            <span>для таблицы объектов</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] bg-slate-900 text-white">
                        <DialogHeader>
                            <DialogTitle>Подтвердите удаление данных</DialogTitle>
                            <DialogDescription>
                                Все данные из таблиц и связанные фотографии будут безвозвратно удалены.
                                Рекомендуется <Link search={{redirect: Route.fullPath}} className="underline text-blue-600" to="/administration/photos/download">скачать</Link> все фотографии перед выполнением этого действия.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-2 justify-end">
                            <DialogClose asChild>
                                <Button variant="ghost" className="border">
                                    Отменить
                                </Button>
                            </DialogClose>
                            <Button
                                variant="destructive"
                                onClick={onSubmitTruncateRecords}
                            >
                                Подтвердить
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </Page>
    )
}
