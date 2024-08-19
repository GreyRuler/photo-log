import './index.css'
import './App.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import {AuthProvider, useAuth} from "./context/auth";
import {NotifyProvider} from "@/context/notifications.tsx";

import { registerSW } from 'virtual:pwa-register'

// Create a new router instance
const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    context: {
        auth: undefined!,
        notify: undefined!,
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
    return <RouterProvider router={router} context={{ auth }} />
}

function App() {
    return (
        <AuthProvider>
            <NotifyProvider>
                <InnerApp />
            </NotifyProvider>
        </AuthProvider>
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
    registerSW()
}
