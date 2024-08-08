import {createRootRouteWithContext, Link, LinkProps, Outlet} from '@tanstack/react-router'

import {AuthContext} from '../context/auth'
import {Bell, BookA, Camera, Home, LogOut, Star, User} from "lucide-react";
import {Button, ButtonProps} from "../components/ui/button";
import {
    Drawer, DrawerClose,
    DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,
    DrawerTrigger
} from "../components/ui/drawer";
import React from "react";

interface MyRouterContext {
    auth: AuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    // beforeLoad: ({context, location}) => {
    //     if (!context.auth.isAuthenticated && location.pathname !== "/login") {
    //         throw redirect({
    //             to: '/login',
    //             search: {
    //                 redirect: location.href,
    //             },
    //         })
    //     }
    // },
    component: AuthLayout,
})

function AuthLayout() {
    return (
        <div className="text-white h-dvh overflow-hidden flex flex-col">
            <header className="w-full bg-primary py-3">
                <h1 className="font-bold text-3xl text-center">ПОРТАЛ СКОЛКОВО</h1>
            </header>
            <main className="flex-1 bg-slate-800 overflow-hidden">
                <Outlet/>
            </main>
            <footer className="flex justify-center p-2 gap-8 bg-primary">
                <Link to="/">
                    <ActionButton icon={<Home width="24" height="24"/>}/>
                </Link>
                {/*<Link to="/favorites">*/}
                <Link to="/">
                    <ActionButton icon={<Star width="24" height="24"/>}/>
                </Link>
                <ActionButton icon={<Camera width="24" height="24"/>}/>
                <Drawer>
                    <DrawerTrigger asChild>
                        <ActionButton icon={<User width="24" height="24"/>}/>
                    </DrawerTrigger>
                    <DrawerContent className="text-white bg-primary border-none">
                        <DrawerHeader>
                            <DrawerTitle>Панель администратора</DrawerTitle>
                            <DrawerDescription>В этой панели вы можете управлять пользователями, фотографиями и
                                приоритетами. Выберите один из вариантов ниже, чтобы продолжить.</DrawerDescription>
                        </DrawerHeader>
                        <div className="grid grid-cols-2 gap-4 p-4">
                            <DrawerButton title="Уведомления" icon={<Bell width="24" height="24"/>}/>
                            <DrawerButton title="Выйти" icon={<LogOut width="24" height="24"/>} to="/logout"/>
                            <DrawerButton title="Панель администратора" icon={<BookA width="24" height="24"/>} to="/administration"/>
                        </div>
                    </DrawerContent>
                </Drawer>
            </footer>
        </div>
    )
}

type ActionButtonProps = ButtonProps & {
    icon: React.ReactNode
}

type DrawerButtonProps = LinkProps & {
    icon: React.ReactNode
    title: string
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(({icon, ...props}, ref) => (
    <Button ref={ref} {...props} className="rounded-full w-12 h-12 p-0">
        {icon}
    </Button>
));

const DrawerButton = React.forwardRef<HTMLAnchorElement, DrawerButtonProps>(({ icon, title, ...props }, ref) => (
    <DrawerClose asChild>
        <Link ref={ref} className="h-20" {...props}>
            <Button className="flex flex-col h-full w-full bg-slate-800">
                {icon}
                <span>{title}</span>
            </Button>
        </Link>
    </DrawerClose>
));
