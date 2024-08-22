import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {nanoid} from "nanoid";
import {Fragment} from "react";
import {Label} from "@/components/ui/label.tsx";
import {SubmitHandler, useFormContext} from "react-hook-form";
import {FormSchemaPhoto} from "@/form/photos/formSchema.ts";
import {FileInput} from "@/form/FileInput.tsx";
import {ButtonSubmit} from "@/form/ButtonSubmit.tsx";

type Props = {
    categories: string[]
    location: string
    onSubmit: SubmitHandler<FormSchemaPhoto>
};

export function Form({categories, location, onSubmit}: Props) {
    const form = useFormContext<FormSchemaPhoto>()

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full m-auto space-y-6">
            <FormField
                control={form.control}
                name="category"
                render={({field}) => (
                    <FormItem className="space-y-6">
                        <FormLabel className="text-base">Выберите категорию</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-wrap gap-y-9"
                            >
                                {categories.map((item) => {
                                    const id = nanoid()
                                    return (
                                        <FormItem key={id}>
                                            <FormControl>
                                                <Fragment>
                                                    <RadioGroupItem value={item} id={id}
                                                                    className="peer sr-only"/>
                                                    <Label
                                                        htmlFor={id}
                                                        className="w-full h-full text-base rounded-md bg-slate-700 p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-slate-900 [&:has([data-state=checked])]:bg-slate-900 peer-data-[state=checked]:text-accent [&:has([data-state=checked])]:text-accent"
                                                    >
                                                        {item}
                                                    </Label>
                                                </Fragment>
                                            </FormControl>
                                        </FormItem>
                                    )
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FileInput location={location}/>
            <ButtonSubmit/>
        </form>
    )
}
