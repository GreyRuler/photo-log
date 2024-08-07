import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/administration/favorites')({
  component: () => <div>Hello /administration/favorites!</div>
})
