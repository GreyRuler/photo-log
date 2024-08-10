import {createFileRoute, Link} from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";
import {Images, Sheet, Star, User} from "lucide-react";
import React from "react";
import {CustomButtonProps} from "@/routes/__root.tsx";

export const Route = createFileRoute('/administration/')({
  component: Administration
})

function Administration() {
    return (
        <div className="h-full overflow-auto p-4 flex flex-col gap-4">
            <LinkButton icon={<Sheet width="24" height="24"/>} title="Таблица" to="/administration/table"/>
            <LinkButton icon={<User width="24" height="24"/>} title="Пользователи" to="/administration/users"/>
            <LinkButton icon={<Star width="24" height="24"/>} title="Приоритет" to="/administration/favorites"/>
            <LinkButton icon={<Images width="24" height="24"/>} title="Фотографии" to="/administration/photos"/>
        </div>
    )
}

const LinkButton = React.forwardRef<HTMLAnchorElement, CustomButtonProps>(({ icon, title, ...props }, ref) => (
    <Link ref={ref} {...props}>
        <Button className="flex flex-col h-32 w-full">
            {icon}
            <span>{title}</span>
        </Button>
    </Link>
));
