import * as React from 'react'

import { sleep } from '../lib/utils'

export interface AuthContext {
    isAuthenticated: boolean
    login: (username: string, token: string) => Promise<void>
    logout: () => Promise<void>
    user: string | null
}

const AuthContext = React.createContext<AuthContext | null>(null)

const key = 'ACCESS_TOKEN'

function getStoredUser() {
    return localStorage.getItem(key)
}

function setStoredKey(token: string | null) {
    if (token) {
        localStorage.setItem(key, token)
    } else {
        localStorage.removeItem(key)
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<string | null>(getStoredUser())
    const isAuthenticated = !!user

    const logout = React.useCallback(async () => {
        await sleep(250)

        setStoredKey(null)
        setUser(null)
    }, [])

    const login = React.useCallback(async (username: string, token: string) => {
        await sleep(500)

        setStoredKey(token)
        setUser(username)
    }, [])

    React.useEffect(() => {
        setUser(getStoredUser())
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
