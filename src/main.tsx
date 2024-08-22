import './index.css'
import './App.css'
import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createRouter} from '@tanstack/react-router'

// Import the generated route tree
import {routeTree} from './routeTree.gen'
import {AuthProvider, useAuth} from "./context/auth";
import {NotifyProvider, useNotify} from "@/context/notifications.tsx";
import {SettingsProvider, useSettings} from "@/context/settings.tsx";

// Create a new router instance
const router = createRouter({
    routeTree,
    defaultPreload: false,
    context: {
        auth: undefined!,
        notify: undefined!,
        settings: undefined!,
    }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function InnerApp() {
    const auth = useAuth()
    const notify = useNotify()
    const settings = useSettings()
    return <RouterProvider router={router} context={{auth, notify, settings}}/>
}

function App() {
    return (
        <SettingsProvider>
            <AuthProvider>
                <NotifyProvider>
                    <InnerApp/>
                </NotifyProvider>
            </AuthProvider>
        </SettingsProvider>
    )
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <App/>
        </StrictMode>,
    )
}
