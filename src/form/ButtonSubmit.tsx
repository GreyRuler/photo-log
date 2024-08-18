import Spinner from "@/components/Spinner.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useFormContext} from "react-hook-form";

export function ButtonSubmit() {
    const form = useFormContext()

    return (
        <Button
            disabled={form.formState.isSubmitting}
            className="font-bold text-emerald-500 w-full text-base border focus:bg-emerald-500 focus:text-white border-emerald-500"
            type="submit">
            {form.formState.isSubmitting ? <Spinner/> : "Отправить"}
        </Button>
    )
}
