import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/administration/')({
  component: Administration
})

function Administration() {
    // <DrawerButton title="Приоритет" icon={<Star width="24" height="24"/>} to={'/administration/favorites'}/>
    // <DrawerButton title="Пользователи" icon={<User width="24" height="24"/>} to="/administration/users"/>
    // <DrawerButton title="Фотографии" icon={<Images width="24" height="24"/>} to="/administration/photos"/>
}
