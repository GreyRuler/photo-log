import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RefreshCw} from "lucide-react";
import {SubmitHandler, useFormContext} from "react-hook-form";
import {FormSchemaSheetSync} from "@/form/settings/formSchemaSheetSync.ts";

type Props = {
    onSubmit: SubmitHandler<FormSchemaSheetSync>
};

export function FormSheetSync({onSubmit}: Props) {
    const form = useFormContext<FormSchemaSheetSync>()

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="sheet_api"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>ENDPOINT URL из sheetdb.io</FormLabel>
                        <div className="flex items-center gap-2 justify-between space-y-0">
                            <Input
                                type="url"
                                placeholder="https://sheetdb.io/api/v1/"
                                className="border-slate-900 shadow-none"
                                {...field}
                            />
                            <Button type="submit" className="p-2"><RefreshCw size="24"/></Button>
                        </div>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </form>
    );
}
