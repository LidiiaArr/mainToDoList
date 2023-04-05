import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddCircleOutline} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem:(title:string)=>void
}

const AddItemForm = (props:AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const itemTitle = e.currentTarget.value.trim()
        setTitle(e.currentTarget.value)
        if (error && itemTitle) setError(false) //Если будет в ошибке true и в title что то в ошибке пропиши false
        if (!error && !itemTitle) setError(true) //Если будет в ошибке false и в title ничего в ошибке пропиши true
    }//Валидация на предмет пустой строки


    const errorInputStyle = error ? {border: "2px solid red", outline: "none"} : undefined
    //Стиль ошибки

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }//добавление таски по нажатию клавиши

    const addItem = () => {
        const itemTitle = title.trim() //Метод trim() удаляет пробельные символы с начала и конца строки.
        if (itemTitle) {
            props.addItem(itemTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <TextField //контролируемый инпут
                //style={errorInputStyle}
                size={"small"}
                variant={"outlined"}
                value={title}
                color={"primary"}
                label={"Title"}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
                error={error}
                helperText={error && "Title is required!"}
            />
            <IconButton
                color={'primary'}
                onClick={addItem}>
                <AddCircleOutline/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;