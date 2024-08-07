import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {TExpense} from "../api/Expense.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function structureData(data: TExpense[]) {
    return data.reduce((acc, curr) => {
        if (curr.number) {
            // Проверяем уровень заголовка по количеству точек
            const level = curr.number.split('.').length - 1
            // console.log(level, curr.number)
            const newSection: TExpense = {...curr, subRows: []}
            // Удаляем разделы из стека, которые выше текущего уровня
            while (acc.sectionStack.length >= level) {
                acc.sectionStack.pop()
            }
            // Если есть родительский раздел, добавляем в его items, иначе добавляем в корень
            if (acc.sectionStack.length) {
                acc.sectionStack[acc.sectionStack.length - 1].subRows?.push(newSection)
            } else {
                acc.result.push(newSection)
            }
            // Добавляем новый раздел в стек
            acc.sectionStack.push(newSection)
        } else {
            // Добавляем объект в текущий раздел
            if (acc.sectionStack.length) {
                const folderLast = acc.sectionStack[acc.sectionStack.length - 1]
                acc.sectionStack[acc.sectionStack.length - 1].subRows?.push({...curr, folder: folderLast.number})
            }
        }

        return acc
    }, {result: <TExpense[]>[], sectionStack: <TExpense[]>[]}).result
}
