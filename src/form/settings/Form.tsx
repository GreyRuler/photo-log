import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {SubmitHandler, useFormContext} from "react-hook-form";
import {SettingsSchema} from "@/form/settings/formSchema.ts";
import {ButtonSubmit} from "@/form/ButtonSubmit.tsx";

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
            <ButtonSubmit/>
        </form>
    )
}
