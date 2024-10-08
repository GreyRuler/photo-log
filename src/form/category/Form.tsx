import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SubmitHandler, useFormContext} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/form/category/formSchema.ts";
import {Undo2} from "lucide-react";
import {Route} from "@/routes/administration/categories";
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
                name="name"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Наименование для папки</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-slate-900"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <footer className="flex justify-between gap-6">
                <ButtonSubmit/>
                <Button type="button" onClick={() => navigate({to: "/administration/categories"})}><Undo2/></Button>
            </footer>
        </form>
    )
}
