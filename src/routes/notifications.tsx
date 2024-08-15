import {createFileRoute} from '@tanstack/react-router'
import Notification, {TNotification} from "@/api/Notification.ts";
import {nanoid} from "nanoid";
import {useEffect} from "react";
import {useNotify} from "@/context/notifications.tsx";
import {Notify} from "@/components/ui/notify.tsx";

export const Route = createFileRoute('/notifications')({
    loader: () => Notification.list<TNotification>(),
    component: Notifications,
})

function Notifications() {
    const {notify, notifications} = useNotify()
    const data = Route.useLoaderData()
    console.log(notifications)
    useEffect(() => {
        notify(data)
    }, [data]);

    return (
        <div className="h-full overflow-auto p-4 space-y-4">
            {data.map((notification) => (
                <Notify
                    isView={!!notifications.find((item) => item.id === notification.id)}
                    key={nanoid()}
                >
                    <div
                        className="px-4 py-2 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 flex flex-col gap-2"
                        key={nanoid()}
                    >
                        <div>{notification.date}</div>
                        <div className="text-xl font-bold">{notification.title}</div>
                        <div>{notification.content}</div>
                    </div>
                </Notify>
            ))}
        </div>
    )
}
