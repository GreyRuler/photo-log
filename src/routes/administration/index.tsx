import {createFileRoute, Link, LinkProps, redirect} from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";
import {Bell, Folder, Images, Settings, Sheet, Star, User} from "lucide-react";
import React from "react";

export const Route = createFileRoute('/administration/')({
    beforeLoad: ({context, location}) => {
        if (!context.auth.user?.isAdmin) {
            throw redirect({
                to: '/',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
    component: Administration
})

function Administration() {
    return (
        <div className="h-full overflow-auto p-4 flex flex-col gap-4">
            <LinkButton icon={<Sheet width="24" height="24"/>} title="Таблица" to="/administration/table"/>
            <LinkButton icon={<User width="24" height="24"/>} title="Пользователи" to="/administration/users"/>
            <LinkButton icon={<Folder width="24" height="24"/>} title="Категории для общих фотографий"
                        to="/administration/categories"/>
            <LinkButton icon={<Bell width="24" height="24"/>} title="Уведомления" to="/administration/notifications"/>
            <LinkButton icon={<Star width="24" height="24"/>} title="Приоритет" to="/administration/favorites"/>
            <LinkButton icon={<Images width="24" height="24"/>} title="Фотографии" to="/administration/photos"/>
            <LinkButton icon={<Settings width="24" height="24"/>} title="Настройки приложения"
                        to="/administration/settings"/>
        </div>
    )
}

export type CustomLinkProps = LinkProps & {
    icon: React.ReactNode
    title: string
    className?: string,
}

const LinkButton = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(({icon, title, ...props}, ref) => (
    <Link ref={ref} {...props}>
        <Button className="flex flex-col h-32 w-full">
            {icon}
            <span>{title}</span>
        </Button>
    </Link>
));
