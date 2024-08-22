export function CategoriesNotFound() {
    return (
        <div className="h-full overflow-auto p-4 flex">
            <div className='m-auto flex flex-col w-60 text-center'>
                <span>Категории пока не добавлены.</span>
                <span className="text-muted-foreground">Пожалуйста, свяжитесь с администратором, чтобы добавить нужные Вам категории.</span>
            </div>
        </div>
    )
}
