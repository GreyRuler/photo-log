import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/photos/')({
  component: Index
})

function Index() {
    return (
        <div className="p-4 h-full overflow-auto">
            asd
        </div>
    )
}
