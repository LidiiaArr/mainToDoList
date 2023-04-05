import React from "react";
import {TasksStateType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC, todolistReducer} from "./todolist-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    //создаем пустой ассоциативный массив для тасок
    const startTodolistsState: Array<TodoListType> = []
//пустой массив для объекта тудулист

    const action = AddTodoListAC('new todolist')
    //создаем объект экшен

    const endTasksState = tasksReducer(startTasksState, action)
    //сохраняем новый стейт с тасками после изменения в редьюсере

    const endTodolistsState = todolistReducer(startTodolistsState, action)
    //сохраняем новый стейт с тудулистами после изменения в редьюсере


    const keys = Object.keys(endTasksState)
    //ожидаю массив ['id todolist']

    const idFromTasks = keys[0]
    //получаем значение первого элемента в массиве из таск

    const idFromTodolists = endTodolistsState[0].id
    //получаем значение id из тудулиста

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})

