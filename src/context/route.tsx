import React, {createContext, useContext} from 'react';
import {getRouteApi, RouteApi} from '@tanstack/react-router';
import type {RouteIds, RegisteredRouter} from '@tanstack/react-router';

type TRouteProvider = {
    id: RouteIds<RegisteredRouter['routeTree']>
    children: React.ReactNode
}

// Создаем контекст для Route
const RouteContext = createContext<RouteApi<RouteIds<RegisteredRouter['routeTree']>> | null>(null);

// Хук для использования Route в других компонентах
export const useRoute = () => {
    const context = useContext(RouteContext);
    if (!context) {
        throw new Error('useRoute must be used within a RouteProvider');
    }
    return context;
};

// Провайдер для RouteContext
export const RouteProvider = ({id, children}: TRouteProvider) => {
    const route = getRouteApi(id) // <--
    // в компонентах обернутых в провайдера
    // можно получить хуки переданного Route

    return (
        <RouteContext.Provider value={route}>
            {children}
        </RouteContext.Provider>
    );
};
