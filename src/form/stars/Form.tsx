import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {Form as FormProvider} from "@/components/ui/form.tsx";
import {formSchema, StarFormSchema} from "@/form/stars/formSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Star} from "lucide-react";
import {nanoid} from "nanoid";
import {cn} from "@/lib/utils.ts";
import {Record} from "@/api/Record.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {Route} from "@/routes/administration/table.tsx";

type Props = {
    id: number
    stars: number
}

export default function Form({id, stars}: Props) {
    const { toast } = useToast();
    console.log(stars)
    const navigate = Route.useNavigate()
    const form = useForm<StarFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            stars
        }
    })

    async function onSubmit(values: StarFormSchema) {
        await Record.update<boolean, StarFormSchema>(String(id), values)
        toast({
            description: "Приоритет обновлён",
        })
        await navigate({to: "/administration/table"})
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="stars"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(Number(value))
                                        form.handleSubmit(onSubmit)()
                                    }}
                                    value={String(field.value)}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-16">
                                            <SelectValue defaultValue={field.value}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-slate-700 text-white border-white w-16">
                                        {Array.from({length: 11}).map((_, index) => (
                                            <SelectItem key={nanoid()} value={String(index)} className={cn(
                                                field.value === index && 'bg-slate-900',
                                                "justify-center p-2",
                                            )}>
                                                <div className="flex justify-center items-center gap-1 w-full">
                                                    <span>{index}</span>
                                                    <Star size={12} className="fill-yellow-400 stroke-yellow-400"/>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </form>
        </FormProvider>
    )
}
