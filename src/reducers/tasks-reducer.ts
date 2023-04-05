import {FilterValueType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolist-reducer";


// type RemoveTaskActionType = {
//     type: "REMOVE-TASK"
//     taskId: string
//     todolistId: string
// }

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type AddTaskActionType = ReturnType<typeof addTaskAC>

type ChangeTaskStatusActionType= ReturnType<typeof changeTaskStatusAC>

type ChangeTaskTitleActionType= ReturnType<typeof changeTaskTitleAC>



export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListAT
    | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action:ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t=> t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone}: t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title}: t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
            //или через деструктуризацию
            //const {[action.id]:[], ...rest} = {...state}      в rest пойдут все данные кроме action.id
            //return rest
            }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) =>{
    return {type: "REMOVE-TASK", taskId, todolistId} as const
    // as const так как type конкретное значение, а не любая строка
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK", title, todolistId
    }as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS", taskId, isDone: isDone, todolistId
    }as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE", taskId, title, todolistId
    }as const
}