import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/administration/photos')({
    component: () => <div>Hello /administration/photos!</div>
})
