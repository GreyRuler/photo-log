import * as React from 'react'

import {useState} from "react";
import Settings, {DSettings} from "@/api/Settings.ts";
import {getStoredSettings, setStoredSettings} from "@/lib/utils.ts";

export interface SettingsContext {
    settings: DSettings | null
    notify: (settings: DSettings) => Promise<void>
}

const SettingsContext = React.createContext<SettingsContext | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState(getStoredSettings())

    const notify = React.useCallback(async (settings: DSettings) => {
        setSettings(settings)
        setStoredSettings(settings)
    }, [])

    React.useEffect(() => {
        Settings.get().then((data) => setSettings(data))
    }, [])

    return (
        <SettingsContext.Provider value={{ settings, notify }}>
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
