import * as React from 'react'

import {useState} from "react";
import Settings, {DSettings} from "@/api/Settings.ts";

export interface SettingsContext {
    settings: DSettings | null
}

const SettingsContext = React.createContext<SettingsContext | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<DSettings | null>(null)
    // const [settings, setSettings] = getStoredNotifications()

    React.useEffect(() => {
        Settings.get().then((data) => setSettings(data))
    }, [])

    return (
        <SettingsContext.Provider value={{ settings }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    const context = React.useContext(SettingsContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
