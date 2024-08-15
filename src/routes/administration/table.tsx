import {createFileRoute} from '@tanstack/react-router'
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RefreshCw} from "lucide-react";
import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Sheet from "@/api/Sheet.ts";

export const Route = createFileRoute('/administration/table')({
    component: AdministrationTable
})

const formSchema = z.object({
    url: z.string().regex(/^[a-z0-9]+$/, {
        message: "Строка может содержать только строчные буквы a-z и цифры 0-9"
    }),
})

function AdministrationTable() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = Sheet.collect(values.url)
        console.log(response)
    }

    return (
        <div className="h-full p-4 overflow-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="url"
                        render={({field}) => (
                            <FormItem>
                                <div className="flex items-center gap-2 justify-between space-y-0">
                                    <FormLabel className="text-base whitespace-nowrap">
                                        https://sheetdb.io/api/v1/
                                    </FormLabel>
                                    <Input
                                        className="border-slate-900 shadow-none"
                                        {...field}
                                    />
                                    <Button type="submit" className="p-2"><RefreshCw size="24"/></Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}
