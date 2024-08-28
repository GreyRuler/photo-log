import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {SubmitHandler, useFormContext} from "react-hook-form";
import {SettingsSchema} from "@/form/settings/formSchema.ts";
import {ButtonSubmit} from "@/form/ButtonSubmit.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Clipboard} from "lucide-react";
import {copyToClipboard} from "@/lib/utils.ts";

type Props = {
    onSubmit: SubmitHandler<SettingsSchema>
}

export default function Form({onSubmit}: Props) {
    const form = useFormContext<SettingsSchema>()

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="event_name"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Наименование мероприятия</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-slate-900"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>

                )}
            />
            <FormField
                control={form.control}
                name="event_location"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Локация мероприятия</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-slate-900"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="main_url"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Основная ссылка</FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-2 justify-between space-y-0">
                                <Input {...field} className="border-slate-900"/>
                                <Button onClick={() => copyToClipboard(field.value)} type="button" className="p-2"><Clipboard size="24"/></Button>
                            </div>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <ButtonSubmit/>
        </form>
    )
}
