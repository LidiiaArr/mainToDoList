import React from "react";
import {v1} from "uuid";
import {FilterValueType, TodoListType} from "../App";
import {
    ActionType, AddTodoListAC, ChangeTodoListFilterAC,
    ChangeTodoListFilterAT, ChangeTodoListTitleAC,
    ChangeTodoListTitleAT,
    RemoveTodoListAC,
    todolistReducer
} from "./todolist-reducer";

let todolistId1: string;
let todolistId2: string;
//При запуске файла сначала создаются переменные
let startState: Array<TodoListType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})
//beforeEach срабатывает перед каждым тестом и происходит инициализация переменных с undefined
//чтобы не создавать в каждом тесте переменные и не дублировать код
test("correct todolist should be removed", ()=>{
    //тестовые данные
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    //
    // const startState: Array<TodoListType> = [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'},
    // ]
    //вызов тестируемой функции
    const endState = todolistReducer(startState, RemoveTodoListAC(todolistId2))

    //проверка результата
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1)
})

test("correct todolists should be added", ()=>{
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist'

    // const startState: Array<TodoListType> = [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'},
    // ]

    const endState = todolistReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be changed", () =>{
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    let newFilter:FilterValueType =  "completed"

    // const startState: Array<TodoListType> = [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'},
    // ]

    const action:  ChangeTodoListFilterAT = ChangeTodoListFilterAC(todolistId2, newFilter)
    const endS = todolistReducer(startState, action)

    expect(endS[0].filter).toBe("all");
    expect(endS[1].filter).toBe(newFilter)
});

test("correct tdl should change its name", () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    // const startState: Array<TodoListType> = [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'},
    // ]


    const endState = todolistReducer(startState, ChangeTodoListTitleAC(todolistId2,newTodolistTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
    expect(endState[1].title).toBe("New Todolist")
})


test("test userReducer", ()=>{
    type UserType = {
        id: number
        userName: string
        email: string
        password: string
    }

    const startState: UserType[] = [
        {   id: 1,
            userName: "ff",
            email: "hgghgh",
            password: "1111"
        },
        {   id: 2,
            userName: "ff",
            email: "hgghgh",
            password: "3"
        }
    ]
    type ChangeUserPasswordTypeAT = {
        type: "CHANGE-USER-PASSWORD"
        payload: {
            id:number
            newPassword:string
        }
    }
    const userReducer =
        (state: UserType[], action: ChangeUserPasswordTypeAT): UserType[] => {
            switch (action.type) {
                case "CHANGE-USER-PASSWORD":
                    return state.map(u =>
                        u.id === action.payload.id
                            ? {...u, password: action.payload.newPassword}
                            : u)
                default:
                    return state
            }
        }

    const endState = userReducer(startState, {
        type: "CHANGE-USER-PASSWORD",
        payload: {id: 1, newPassword: "123"}
    })

    expect(endState[0].password).toBe("123")

})