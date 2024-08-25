import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/administration/photos/download')({
      beforeLoad: async () => {
          window.location.href = `/zip`;
          throw redirect({
              to: '/administration'
          })
      }
})
