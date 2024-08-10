import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/photos/upload')({
  component: () => <div>Hello /photos/upload!</div>
})