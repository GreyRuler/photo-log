import { createFileRoute } from '@tanstack/react-router'

import {formSchema} from "@/form/user/formShema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import User, {TUser} from "@/api/User.ts";

export const Route = createFileRoute('/administration/users/$id/update')({
    loader: ({params: {id}}) => User.item<TUser>(id),
    component: UserUpdate,
})

function UserUpdate() {
    const data = Route.useLoaderData()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data,
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        User.create(values)
    }

    return (
        <div className="h-full w-full overflow-auto flex">
            <Card className="w-[350px] m-auto bg-slate-800 border-slate-900 text-white">
                <CardHeader>
                    <CardTitle>Форма обновления пользователя</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
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
                            <Button type="submit">Отправить</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
