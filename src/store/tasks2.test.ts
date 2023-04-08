import React from "react";
import {getSquarePositiveIntegers, getSum, getTriangleType, isEvenIndexSumGreater, sum2} from "./tasks2";


test("sum", () => {
    expect(sum2(3, 5, 7, 6, 4, 9)).toBe(34)
    expect(sum2(1, 1, 1, 6)).toBe(9)
})

test("get Triangle Type", ()=> {
    expect(getTriangleType(1, 1, 1)).toBe("10")
    expect(getTriangleType(2, 3, 3)).toBe("01")
    expect(getTriangleType(3, 3, 2)).toBe("01")
    expect(getTriangleType(4, 5, 3)).toBe("11")
    expect(getTriangleType(10, 2, 2)).toBe("00")
})

test("get Sum ", ()=> {
    expect(getSum(1000)).toBe(1)
    expect(getSum(0)).toBe(0)
    expect(getSum(1234)).toBe(10)
    expect(getSum(9999)).toBe(36)
})

test("is Even Sum Greater", ()=> {
    expect(isEvenIndexSumGreater([1, 100, 2, 200])).toBe(false)
    expect(isEvenIndexSumGreater([100, 1, 200, 2])).toBe(true)
    expect(isEvenIndexSumGreater([100, 1, 200, 2, 300, 4])).toBe(true)
    expect(isEvenIndexSumGreater([100, 1, 200, 2, 4])).toBe(true)
})

test("get Square Only Of Positive Integers", () => {
    const array = [4, 5.6, -9.8, 3.14, 10, 6, 8.34, -2]
    const len = array.length
    const result = getSquarePositiveIntegers(array)
    expect(result === array).toBe(false)
    expect(array.length).toBe(len)
    expect(result.length).toBe(3)
    expect(result[0]).toBe(16)
    expect(result[1]).toBe(100)
    expect(result[2]).toBe(36)
})

