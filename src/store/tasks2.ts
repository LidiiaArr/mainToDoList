import React from "react";

// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum2(...nums: Array<number>): number {
    return nums.reduce((acc, el)=> acc +el)
}

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number,b: number,c: number): string {
    if( !(a+b > c && a+c > b && b+c > a) )return "00"
    if(a===b && b===c) return "10"
    if(a===b || a===c || b===c)return "01"
    else return "11"
}

// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number{
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let str = String(number)
    let arr = str.split('').map((el)=> Number(el))
    return arr.reduce((acc,el)=>acc + el)
}

// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let arr1 = []
    let arr2 = []
    for(let i=0; i < arr.length; i++){
        if(i===0){
           arr1.push(arr[0])
        }
        if(i%2 === 0){
            arr1.push(arr[i])
        }
        else {
            arr2.push(arr[i])
        }
    }
    let num1 = arr1.reduce((acc,el) => acc + el)
    let num2 = arr2.reduce((acc,el) => acc+ el)
    return num1> num2 ? true : false;
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив.
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return []
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return 0
}

// ...и "лапку" вверх!!!!