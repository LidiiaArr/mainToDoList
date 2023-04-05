import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValueType, TasksStateType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {HighlightOff} from "@material-ui/icons";

type ToDoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeToDoList: (todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValueType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (tasksId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const ToDoList = (props: ToDoListPropsType) => {

    const tasksJSXElements = props.tasks.length
        //Условный рендеринг проверка есть ли что рендерить
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.todoListID);
            //когда колбэк прилитает на удаление таски, колбэк приносит данные какую таску удалить и из какого тудулиста
            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID);
            const changeTaskTitle = (title: string) => { //функция найди таску и поменяй значение
                props.changeTaskTitle(t.id, title, props.todoListID)
            }
            const taskClasses = t.isDone ? "is-done" : "";
            return (
                <ListItem key={t.id}
                style={{padding:"0px"}}
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

    const changeFilter = (filter: FilterValueType, todoListID: string) => {
        return () => props.changeTodoListFilter(filter, props.todoListID)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }



    const removeTodoList = ()=> props.removeToDoList(props.todoListID)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} updateTitle={changeTodoListTitle}/>
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
                    color={props.filter === "all" ? "secondary" : "primary"}
                    variant={'contained'}
                    disableElevation
                    onClick={changeFilter("all", props.todoListID)}>All
                </Button>
                <Button
                    size={'small'}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    variant={'contained'}
                    disableElevation
                    onClick={changeFilter("active", props.todoListID)}>Active
                </Button>
                <Button
                    size={'small'}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    variant={'contained'}
                    disableElevation
                    onClick={changeFilter("completed", props.todoListID)}>Completed
                </Button>
            </div>
        </div>
    );
};

export default ToDoList;