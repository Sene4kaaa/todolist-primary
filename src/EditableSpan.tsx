import React, {ChangeEvent, useState} from 'react';


type PropsType = {
    oldTitle: string
    callBack: (title: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    let [newtitle, setNewTitle] = useState(props.oldTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(newtitle)
    }


    const editHandler = () => {
        setEdit(!edit)
        addTask()
    }

    return (
        edit
            ? <input value={newtitle} onBlur={editHandler} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

