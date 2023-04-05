import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    classes?: string //необъязательный props
    title: string
    updateTitle: (newTitle:string)=>void
}

const EditableSpan = (props: EditableSpanPropsType) => { //компонента которая редактирует название таски и тудулиста
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title) //В исходном состоянии стейта находиться заголовок таски/тудулиста чтобы когда откроется инпут у него в качестве value
    // прилетит из пропсов заголовок и можно было редактировать заголовок таски/тудулиста

    const onEditMode = () => setEditMode(true)
    const ofEditMode = () => { //когда мы выходим из режима редактирования, значит мы закончили редактирование
        setEditMode(false)
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value) //то что пользователь будет набирать будем сразу сетать в локальный стейт
        props.updateTitle(title) // Из локального стейта сетаем в
    }

    return (
        editMode //тернарник если в editMode будет true покажи инпут иначе название таски
            ? <TextField
                variant={"standard"}
                value={title} //Чтобы инпут был контролируемым,то что печатается сохраняется в стейте
                autoFocus //автоматически устанавливает фокус в поле формы, сразу можно набирать текст без явного щелчка по нему курсором мыши
                onBlur={ofEditMode} //при клике в любом другом месте вызывай функцию которая будет менять editMode на false и меняет input на таску
                onChange={onChangeSetTitle}
            />
            : <span
                className={props.classes} //пропс с название класса "is-done" или "" который определяет какой стиль будет у чекбокса и таски
                onDoubleClick={onEditMode} //на двойной клик
            >{props.title}</span> //пропс с названием таски из глобального стейта (от родителя)
    );
};

export default EditableSpan;