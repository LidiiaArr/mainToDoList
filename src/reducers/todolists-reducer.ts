import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type:"ADD-TODOLIST"
    title: string
    todolistId: string
}
 export type ChangeTodoListFilterAT = {
    type:"CHANGE-TODOLIST-FILTER"
    id:string
    filter: FilterValueType
}
export type ChangeTodoListTitleAT = {
    type:"CHANGE-TODOLIST-TITLE"
    id:string
    title:string
}

let initialState : Array<TodoListType> = [

]
//Ещё одно: с первым системным экшеном, который редакс диспатчит\отправляет в наши редьюсеры стейт не приходит.
// Он равен undefined, его нет, потому что жизнь только зарождается:
//Поэтому для параметра state мы должны задать значение по дефолту, равное начальному состоянию.

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export const todolistsReducer = (todolists= initialState, action:ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = { //создание объекта с помощью литерала объекта
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [...todolists,newTodoList]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id? {
                ...tl,
                title: action.title
            } : tl)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string):RemoveTodoListAT =>({ type: "REMOVE-TODOLIST", id: id})

export const AddTodoListAC = (title: string):AddTodoListAT => ({type:"ADD-TODOLIST",title:title, todolistId: v1()})
////Создаем уникальный id для тудулиста c помощью библиотеки uuid вызывая функцию v1()

export const ChangeTodoListFilterAC = (id:string,filter: FilterValueType):ChangeTodoListFilterAT =>({type:"CHANGE-TODOLIST-FILTER",id:id, filter:filter})

export const ChangeTodoListTitleAC = (id:string,title:string):ChangeTodoListTitleAT =>({type:"CHANGE-TODOLIST-TITLE",id:id, title:title})