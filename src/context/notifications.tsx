import * as React from 'react'

import {getStoredNotifications, setStoredNotifications} from '../lib/utils'
import Notification, {TNotification} from "@/api/Notification.ts";
import {useState} from "react";

export interface NotifyContext {
    isView: boolean
    notify: (notifications: TNotification[]) => Promise<void>
    notifications: TNotification[]
}

const NotifyContext = React.createContext<NotifyContext | null>(null)

export function NotifyProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState(getStoredNotifications())
    const [isView, setView] = React.useState(true)

    const notify = React.useCallback(async (notifications: TNotification[]) => {
        setNotifications(notifications)
        setView(true)
        setStoredNotifications(notifications)
    }, [])

    React.useEffect(() => {
        Notification.list<TNotification>()
            .then((data) => {
                setView(JSON.stringify(notifications) === JSON.stringify(data))
                setNotifications(data)
            })
    }, [])

    return (
        <NotifyContext.Provider value={{ isView, notify, notifications }}>
            {children}
        </NotifyContext.Provider>
    )
}

export function useNotify() {
    const context = React.useContext(NotifyContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
