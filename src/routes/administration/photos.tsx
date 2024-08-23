import {createFileRoute} from '@tanstack/react-router'
import {Download} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const Route = createFileRoute('/administration/photos')({
    component: Photos
})

function Photos() {
    const onDownload = () => {
        window.location.href = `/zip`;
    }

    return (
        <div className="h-full w-full overflow-auto flex p-4">
            <Button className="w-full h-20" onClick={onDownload}>
                <Download/>
                <span className="text-base">Скачать фотографии</span>
            </Button>
        </div>
    )
}
