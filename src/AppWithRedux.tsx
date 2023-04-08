import React, {useReducer} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import ToDoList1 from "./ToDoList1";

export type FilterValueType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType> //типизируем вычисляемое свойство объекта [тутМожетБытьЧтоУгодно: string]: TaskType[]
}


function AppWithRedux() {

    const todoListID_1 = v1() //вызываем функцию v1()  для создания Id, библиотека uuid
    //библиотека генерирует строку из цифр(0-9) и букв(a-f)
    //добавление библиотеки uuid: yarn add uuid
    //добавление библиотеки с готовыми прописанными типами для предыдущей: yarn add @types/uuid
    //Импорт функции import {v1} from "uuid";

    const todoListID_2 = v1()

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
//типизируется дженериком тип стейта с которым работаем вторым возвращаемое значение useSelector
//принимает колбек который принимает state и возвращает часть стейта

    // let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()
//получение функции store.dispatch в компоненте

    // const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer,[
    //     {id: todoListID_1, title: 'What to learn', filter: 'all'},
    //     {id: todoListID_2, title: 'What to buy', filter: 'all'},
    // ])
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    //     [todoListID_1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS/TS", isDone: true},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Storybook", isDone: false},
    //         {id: v1(), title: "MI", isDone: false}],
    //     [todoListID_2]: [
    //         //Важно свойство [todoListID_2] в квадратных скобках так как иначе todoListID_2 будет восприниматься как строка, а не как переменная
    //         //[вычисляемое свойство объекта]- специфический синтаксис, это выполняемый код, а не строка
    //         {id: v1(), title: "Ice cream", isDone: true},
    //         {id: v1(), title: "Chocolate", isDone: true},
    //         {id: v1(), title: "Cake", isDone: false},
    //         {id: v1(), title: "Pizza", isDone: false},
    //         {id: v1(), title: "Nutella", isDone: false}
    //     ]
    // })


    const removeTask = (tasksID: string, todoListID: string) => {
        // const currentTodoListTasks = tasks[todoListID] //Берем объект(стейт) таскс и по id получаем массив с которым будем работать
        // const updatedTasks = currentTodoListTasks.filter(t => t.id !== tasksID) //Берем таски и отфитровываем и получаем новый массив с -1 таской
        // tasks[todoListID] = updatedTasks //новый отфильтрованный массив сохраняем в стейте
        // setTasks({...tasks})//Информируем реакт что в стейте tasks произошли изменения
        // //проходит через наш фильтр.Фильтруем так чтобы задержать таску с этой tasksID
        // //Мы будем брать по очереди все таски t отдельная таска и будем проверять  t.id проходит если через наш фильтр если только у нее другая id
        let action = removeTaskAC(tasksID,todoListID)
        dispatch(action)
    }
    const addTask = (title: string, todoListID: string) => {
        // const newTask: TaskType = {
        //     id: v1(), title: title, isDone: false
        // }
        // const currentTodoListTasks = tasks[todoListID] //Берем объект(стейт) таскс и по id получаем массив с которым будем работать
        // const updatedTasks = [newTask, ...currentTodoListTasks] //В этот массив хотим засунуть новую таску, создем новый массив ложим новую таску и копируем остальные таски из массива найденного ранее
        // setTasks({...tasks, [todoListID]: updatedTasks})//Копируем стейт(объект) и вносим в ключ новое значение(массив)
        // //создаем копию стейта для работы имьютабельно
        // //Вносим в копию изменения
        // //Копию вместе с изменениями сетаем в стейт в качестве новой версии стейта
        // //Реакт видит новую структуру данных,в нашем случае новый массив и вызывывает метод рендер и новые данные видит пользователь в интерфейсе.
        let action = addTaskAC(title, todoListID)
        dispatch(action)

    }
    const changeTodoListFilter = (newFilterValue: FilterValueType, todoListID: string) => {
        // setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl))
        let action = ChangeTodoListFilterAC(todoListID, newFilterValue)
        dispatch(action)
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        // const currentTodoListTasks: Array<TaskType> = tasks[todoListID]
        // const updatedTasks: Array<TaskType> = currentTodoListTasks.map(t => t.id === taskID ? {
        //     ...t,
        //     isDone: isDone
        // } : t)
        // tasks[todoListID] = updatedTasks
        // setTasks({...tasks})
        let action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatch(action)
    }

    const changeTaskTitle = (tasksId: string, title: string, todoListID: string) => {
        // setTasks({ // создаем новый объект с помощью литерала объекта и сетаем его
        //         ...tasks, //копируем поверхностно весь объект со старыми тасками
        //         [todoListID]: tasks[todoListID].map(t => t.id === tasksId ? { //но в одном массиве находим таску по id
        //             //находим массив с тасками [todoListID]-вычисляемого свойства объекта,
        //             ...t,
        //             title: title //устанавливаем новое значение title
        //         } : t)
        //     }
        // )
        let action = changeTaskTitleAC(tasksId, title, todoListID)
        dispatch(action)
    }

    const changeTodoListTitle = (title: string, todoListID: string) => {
        // setTodoLists(todoLists.map(tl => tl.id === todoListID ? {
        //     ...tl,
        //     title: title
        // } : tl))
        let action = ChangeTodoListTitleAC(todoListID, title)
        dispatch(action)
    }
    const removeToDoList = (todoListID: string) => {
        // setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }
    const addTodoList = (titleNew: string) => { //добавляем новый тудулист
        // const newTodoListID = v1() //Создаем уникальный id для тудулиста c помощью библиотеки uuid вызывая функцию v1()
        // const newTodoList: TodoListType = { //создание объекта с помощью литерала объекта
        //     id: newTodoListID,
        //     title: titleNew,
        //     filter: "all"
        // }
        // setTodoLists([...todoLists, newTodoList])
        // //Копируем все предыдущие тудулисты и сетаем новый тудулист
        // setTasks({...tasks, [newTodoListID]: []})
        // //Создаем хранилище для тасок: возьми все объекты с тасками и дополни объект(ассоциативный массив) новой парой ключ значение
        // //Возьмем id нового тудулиста в качестве ключа, значение - пустой массив(пока что)
        // //Важно свойство [newTodoListID] в квадратных скобках так как иначе newTodoListID будет восприниматься как строка а не как переменная
        // //[вычисляемое свойство объекта]- специфический синтаксис это выполняемый код, а не строка
        let action = AddTodoListAC(titleNew)
        dispatch(action)

    }
//     const getTasksForRender = (todoList: TodoListType) => {
//         let tasksForRender = tasks[todoList.id]
//         if (todoList.filter === "active") {
//             tasksForRender = tasks[todoList.id].filter(t => !t.isDone)
//         }
//         if (todoList.filter === "completed") {
//             tasksForRender = tasks[todoList.id].filter(t => t.isDone)
//         }
//         return tasksForRender
//     }
// //Функция отдает таски в зависимости от фильтра

    const  todoListsComponents = todoLists.length
        ? todoLists.map(tl => {
            return (
                <Grid
                    item
                    key={tl.id}>
                    <Paper
                        elevation={8}
                        style={{padding: "20px"}}
                        square>
                        <ToDoList1
                            key={tl.id}
                            todolist={tl}
                            // todoListID={tl.id}
                            // tasks={getTasksForRender(tl)}
                            // filter={tl.filter}
                            // title={tl.title}
                            //
                            // addTask={addTask}
                            // removeTask={removeTask}
                            // removeToDoList={removeToDoList}
                            // changeTodoListFilter={changeTodoListFilter}
                            // changeTaskStatus={changeTaskStatus}
                            // changeTaskTitle={changeTaskTitle}
                            // changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            )
        })
        : <span> Create your first TodoLists!</span>

    return (
        <div className="App">
            <AppBar position="static">
                {/*Позиционирование вложенных инструментов*/}
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Loginn</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "15px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
