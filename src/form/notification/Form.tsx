import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SubmitHandler, useFormContext} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/form/notification/formSchema.ts";
import {Undo2} from "lucide-react";
import {Route} from "@/routes/administration/notifications";
import {ButtonSubmit} from "@/form/ButtonSubmit.tsx";

type Props = {
    onSubmit: SubmitHandler<z.infer<typeof formSchema>>
}

export default function Form({onSubmit}: Props) {
    const navigate = Route.useNavigate()
    const form = useFormContext<z.infer<typeof formSchema>>()

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Заголовок</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-slate-900"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="content"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Содержание</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-slate-900"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <footer className="flex justify-between gap-6">
                <ButtonSubmit/>
                <Button type="button" onClick={() => navigate({to: "/administration/notifications"})}><Undo2/></Button>
            </footer>
        </form>
    )
}
