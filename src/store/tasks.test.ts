import React from "react";
import {ActionType, div, mult, salaryReducer, StateType, sub, sum} from "./tasks";


test("sum", ()=>{
    //1.Тестовые данные
    const salary: number = 800
    const n:number = 200
    //2.Выполнение тестируемого кода:
    const result = sum(salary,n)
    //3. Проверка результата
    expect(result).toBe(1000)
})

test("sub control", ()=>{
    const salary:number = 1200
    const n:number = 200
    const result = sub(salary,n)
    expect(result).toBe(1000)
})

test("sub short control", ()=>{
    expect(sub(1200,200)).toBe(1000)
    expect(sub(1200,400)).toBe(800)

})

test("div function control", ()=>{
    const salary:number = 150000
    const n:number = 70
    const result = div(salary,n)
    expect(result).toBe(2142.8571428571427)
    expect(div(150000,60)).toBe(2500)
})

test('mult control ', ()=>{
    const salary:number = 150000
    const n:number = 2
    const result = mult(salary,n)
    expect(result).toBe(300000)
    expect(mult(150000,1.5)).toBe(225000)
})

test("salaryReducer function control !case SUM! ", ()=>{
    const salary: StateType = 800
    const action: ActionType = {
        type: "SUM",
        n: 200
    }
    const result = salaryReducer(salary, action)
    expect(result).toBe(1000)
    expect(salaryReducer(salary, {type: "TEST",n: 200})).toBe(800)
})

test("salaryReducer function control !case SUB!", ()=>{
    const salary: StateType = 800
    const action: ActionType = {
        type: "SUB",
        n: 200
    }
    const result = salaryReducer(salary,action)
    expect(result).toBe(600)
})

test("salaryReducer function control !case DIV!", ()=>{
    const salary: StateType = 180000
    const action: ActionType = {
        type: "DIV",
        n: 60
    }
    const result = salaryReducer(salary, action)
    expect(result).toBe(3000)
})

test("salaryReducer function control !case MULT!", ()=>{
    const salary: StateType = 180000
    const action: ActionType = {
        type: "MULT",
        n: 3
    }
    const result = salaryReducer(salary, action)
    expect(result).toBe(540000)
})