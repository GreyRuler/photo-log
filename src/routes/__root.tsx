import {
    createRootRouteWithContext,
    Link,
    Outlet,
    redirect,
    useMatchRoute,
} from '@tanstack/react-router'

import {AuthContext, useAuth} from '../context/auth'
import {Bell, BookA, Camera, EyeIcon, LogOut, Star, Table2, Upload, User} from "lucide-react";
import {Button, ButtonProps} from "../components/ui/button";
import {
    Drawer, DrawerClose,
    DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,
    DrawerTrigger
} from "../components/ui/drawer";
import React from "react";
import {CustomLinkProps} from "@/routes/administration";
import {NotifyContext, useNotify} from "@/context/notifications.tsx";
import {Notify} from "@/components/ui/notify.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {cn} from "@/lib/utils.ts";
import {SettingsContext, useSettings} from "@/context/settings.tsx";

interface MyRouterContext {
    auth: AuthContext
    notify: NotifyContext
    settings: SettingsContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    beforeLoad: ({context, location}) => {
        if (!context.auth.user && location.pathname !== "/login") {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
    component: AuthLayout,
})

function AuthLayout() {
    const auth = useAuth()
    const {isView} = useNotify()
    const {settings} = useSettings()
    const matchRoute = useMatchRoute()
    const matchAdministration = matchRoute({to: '/administration', fuzzy: true})
    const matchNotifications = matchRoute({to: '/notifications', fuzzy: true})
    const matchPhotos = matchRoute({to: '/photos'})
    const matchPhotosAll = matchRoute({to: '/photos/all', fuzzy: true})
    const matchDetails = matchRoute({to: '/details/$id', fuzzy: true})

    return (
        <div className="text-white h-dvh overflow-hidden flex flex-col">
            <header className="w-full bg-primary py-3">
                <h1 className="font-bold text-base text-center">{settings?.event_name}</h1>
            </header>
            <main className="flex-1 bg-slate-800 overflow-hidden">
                <Outlet/>
            </main>
            {auth.isAuthenticated && <footer className="flex justify-center p-2 gap-8 bg-primary">
                <Link to="/" activeProps={{ className: "group" }}>
                    <ActionButton icon={<Table2
                        width="24" height="24"
                        className={cn(
                            'group-data-[status=active]:stroke-emerald-500',
                            matchDetails && 'stroke-emerald-500',
                        )}
                    />}/>
                </Link>
                <Link to="/favorites" activeProps={{ className: "group" }}>
                    <ActionButton icon={<Star
                        width="24" height="24"
                        className='group-data-[status=active]:stroke-yellow-400'/>
                    }/>
                </Link>
                <Drawer>
                    <DrawerTrigger asChild>
                        <ActionButton icon={<Camera
                            width="24" height="24"
                            className={cn((matchPhotos || matchPhotosAll) && "stroke-purple-600")}
                        />}/>
                    </DrawerTrigger>
                    <DrawerContent className="text-white bg-primary border-none">
                        <DrawerHeader>
                            <DrawerTitle>Общие фотографии</DrawerTitle>
                            <DrawerDescription>Выберите для загрузки фотографий или просмотра</DrawerDescription>
                        </DrawerHeader>
                        <div className="grid grid-cols-2 gap-4 p-4">
                            <DrawerButton title="Загрузить" icon={<Upload
                                width="24" height="24"
                                className={cn(matchPhotos && "stroke-purple-600")}
                            />} to="/photos"/>
                            <DrawerButton title="Просмотреть" icon={<EyeIcon
                                width="24" height="24"
                                className={cn(matchPhotosAll && "stroke-purple-600")}
                            />} to="/photos/all"/>
                        </div>
                    </DrawerContent>
                </Drawer>
                <Drawer>
                    <DrawerTrigger asChild>
                        <ActionButton icon={<User
                            width="24" height="24"
                            className={cn((matchAdministration || matchNotifications) && "stroke-blue-600")}
                        />}/>
                    </DrawerTrigger>
                    <DrawerContent className="text-white bg-primary border-none">
                        <DrawerHeader>
                            <DrawerTitle>Профиль</DrawerTitle>
                            <DrawerDescription>{auth.user?.name}</DrawerDescription>
                        </DrawerHeader>
                        <div className="grid grid-cols-2 gap-4 p-4">
                            <Notify isView={isView}>
                                <DrawerButton title="Уведомления" icon={<Bell
                                    width="24" height="24"
                                    className={cn(matchNotifications && "stroke-blue-600")}
                                />} to="/notifications"/>
                            </Notify>
                            <DrawerButton title="Выйти" icon={<LogOut width="24" height="24"/>}
                                          to="/logout" preload={false}/>
                            {auth.user?.isAdmin && <DrawerButton
                                title="Панель администратора"
                                icon={<BookA
                                    width="24" height="24"
                                    className={cn(matchAdministration && "stroke-blue-600")}
                                />}
                                to="/administration"
                                className="col-span-2"
                            />}
                        </div>
                    </DrawerContent>
                </Drawer>
            </footer>}
            <Toaster/>
        </div>
    )
}

type ActionButtonProps = ButtonProps & {
    icon: React.ReactNode
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(({icon, ...props}, ref) => (
    <Button ref={ref} {...props} className="rounded-full w-12 h-12 p-0">
        {icon}
    </Button>
));

const DrawerButton = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(({icon, title, className, ...props}, ref) => (
    <DrawerClose asChild>
        <Link ref={ref} className={cn(
            "h-20",
            className
        )} {...props}>
            <Button className="flex flex-col h-full w-full bg-slate-800">
                {icon}
                <span>{title}</span>
            </Button>
        </Link>
    </DrawerClose>
));
