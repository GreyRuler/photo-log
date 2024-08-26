import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SubmitHandler, useFormContext} from "react-hook-form";
import {z} from "zod";
import {createUserSchema} from "@/form/user/formSchema.ts";
import {Undo2} from "lucide-react";
import {Route} from "@/routes/administration/users";
import {ButtonSubmit} from "@/form/ButtonSubmit.tsx";

type Props = {
    isUpdate: boolean
    onSubmit: SubmitHandler<z.infer<typeof createUserSchema>>
}

export default function FormCreate({onSubmit}: Props) {
    const form = useFormContext<z.infer<typeof createUserSchema>>()
    const navigate = Route.useNavigate()

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-slate-900"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Логин</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-slate-900"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                            <Input {...field} className="border-slate-900"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="isAdmin"
                render={({field}) => (
                    <FormItem className="flex justify-between items-center space-y-0">
                        <FormLabel>Администратор?</FormLabel>
                        <FormControl>
                            <Switch
                                className="data-[state=unchecked]:bg-slate-700"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <footer className="flex justify-between gap-6">
                <ButtonSubmit/>
                <Button type="button" onClick={() => navigate({to: "/administration/users"})}><Undo2 /></Button>
            </footer>
        </form>
    )
}
