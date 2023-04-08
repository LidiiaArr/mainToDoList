import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValueType, TasksStateType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {HighlightOff} from "@material-ui/icons";
import {TodoListType} from "./AppWithRedux";
import {AppRootStateType} from "./store/store";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./reducers/todolists-reducer";

type ToDoListPropsType = {
    // todoListID: string
    // title: string
    // tasks: Array<TaskType>
    // filter: FilterValueType
    // addTask: (title: string, todoListID: string) => void
    // removeTask: (taskID: string, todoListID: string) => void
    // removeToDoList: (todoListID: string) => void
    // changeTodoListFilter: (newFilterValue: FilterValueType, todoListID: string) => void
    // changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    // changeTaskTitle: (tasksId: string, title: string, todoListID: string) => void
    // changeTodoListTitle: (title: string, todoListID: string) => void
    key:string
    todolist: TodoListType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const ToDoList1 = ({todolist}: ToDoListPropsType) => {
//{todolist} деструктуризация пропсов

    const {id, title, filter} = {...todolist}
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    if(filter === "active"){
        tasks = tasks.filter(t => t.isDone === false)
    }
    if(filter === "completed"){
        tasks = tasks.filter(t => t.isDone === true)
    }

    const tasksJSXElements = tasks.length
        //Условный рендеринг проверка есть ли что рендерить
        ? tasks.map(t => {
            const removeTask = () => {
                //props.removeTask(t.id, id);
                dispatch(removeTaskAC(t.id, id))
            }
            //когда колбэк прилитает на удаление таски, колбэк приносит данные какую таску удалить и из какого тудулиста
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                //props.changeTaskStatus(t.id, e.currentTarget.checked, id)
                let newIsDoneValue = e.currentTarget.checked
                let action = changeTaskStatusAC(t.id, newIsDoneValue, id)
                dispatch(action)
            };
            const changeTaskTitle = (title: string) => { //функция найди таску и поменяй значение
                // props.changeTaskTitle(t.id, title, id)
                let action = changeTaskTitleAC(t.id, title, id)
                dispatch(action)
            }
            const taskClasses = t.isDone ? "is-done" : "";
            return (
                <ListItem key={t.id}
                          style={{padding: "0px"}}
                          divider
                >
                    <Checkbox
                        size={'small'}
                        color={'primary'}
                        onChange={changeStatus}
                        checked={t.isDone}/>
                    {/*<span className={taskClasses}>{t.title}</span>*/}
                    <EditableSpan classes={taskClasses}
                                  title={t.title}
                                  updateTitle={changeTaskTitle}/>
                    <IconButton
                        onClick={removeTask}
                        size={"small"}>
                        <HighlightOff/>
                    </IconButton>
                    {/*<button onClick={removeTask}>x</button>*/}
                </ListItem>
            )
        })
        : <span>List is empty</span>

    const addTask = (title: string) => {
        // props.addTask(title, id)
        let action = addTaskAC(title, id)
        dispatch(action)
    }

    const changeTodoListTitle = (title: string) => {
        //props.changeTodoListTitle(title, id)
        let action = ChangeTodoListTitleAC(id, title)
        dispatch(action)
    }


    const removeTodoList = () => {
        //props.removeToDoList(id)
        let action = RemoveTodoListAC(id)
        dispatch(action)
    }

    const changeFilterCreateCallback = (filter: FilterValueType, id: string) => {
        //return () => props.changeTodoListFilter(filter, id)
        return () => dispatch(ChangeTodoListFilterAC(id, filter))
    }

    const onAllClickHandler = changeFilterCreateCallback("all",id) // const onAllClickHandler = () => dispatch(ChangeTodoListFilterAC(id, 'all'))
    const onActiveClickHandler = changeFilterCreateCallback("active",id)
    const onComplitedClickHandler = changeFilterCreateCallback("completed",id)


    return (
        <div>
            <h3>
                <EditableSpan title={title} updateTitle={changeTodoListTitle}/>
                {/*в компоненте содержится название тудулиста поэтому в h3*/}
                {/*<button onClick={() => props.removeToDoList(props.todoListID)}>x</button>*/}
                <IconButton
                    onClick={removeTodoList}
                    color={"secondary"}
                    size={"small"}>
                    <HighlightOff/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksJSXElements}
            </List>
            <div>
                <Button
                    size={'small'}
                    color={filter === "all" ? "secondary" : "primary"}
                    variant={'contained'}
                    disableElevation
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    size={'small'}
                    color={filter === "active" ? "secondary" : "primary"}
                    variant={'contained'}
                    disableElevation
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={'small'}
                    color={filter === "completed" ? "secondary" : "primary"}
                    variant={'contained'}
                    disableElevation
                    onClick={onComplitedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
};

export default ToDoList1;