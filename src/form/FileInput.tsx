import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Fragment, useState} from "react";
import {Camera} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {useFormContext} from "react-hook-form";

export function FileInput() {
    const form = useFormContext()

    const [backgroundImage, setBackgroundImage] = useState<string | ArrayBuffer | null | undefined>(null);
    const fileRef = form.register('file', {required: true})

    function handleFileChange(fileList: FileList) {
        const file = fileList[0];
        if (!file) {
            setBackgroundImage(null)
            return
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBackgroundImage(e.target?.result);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <FormField
            control={form.control}
            name="file"
            render={({field}) => (
                <FormItem className="flex flex-col items-center gap-2 justify-between space-y-0">
                    <Button type="button" variant="secondary"
                            className="h-32 w-full p-0 bg-slate-700 active:bg-slate-900 hover:bg-slate-700"
                            style={{
                                backgroundImage: `url(${field.value && backgroundImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                    >
                        <FormLabel className={cn(
                            "w-full h-full text-center text-base whitespace-nowrap flex flex-col items-center justify-center",
                            field.value && "text-emerald-500"
                        )}>
                            {!!(field.value &&backgroundImage) || (
                                <Fragment>
                                    <Camera width="24" height="24"/>
                                    <p className="font-bold">Загрузить фото</p>
                                </Fragment>
                            )}
                            <FormControl>
                                <Input {...fileRef} type="file" className="hidden" accept="image/*"
                                       onChange={(e) => {
                                           fileRef.onChange(e)
                                           e.target.files && handleFileChange(e.target.files)
                                       }}/>
                            </FormControl>
                        </FormLabel>
                    </Button>
                </FormItem>
            )}
        />
    )
}
