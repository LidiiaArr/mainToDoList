import {combineReducers, legacy_createStore,} from "redux";
import {tasksReducer} from "../reducers/tasks-reducer";
import {todolistsReducer} from "../reducers/todolists-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

export const store = legacy_createStore(rootReducer)
// непосредственно создаём store

export type AppRootStateType = ReturnType<typeof rootReducer>
// определить автоматически тип всего объекта состояния

// @ts-ignore
window.store = store;
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент

