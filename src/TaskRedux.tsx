import {useDispatch} from "react-redux";
import React, {ChangeEvent, useCallback} from "react";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {TaskType} from "./Todolist";
import {CheckBox, Delete} from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox/Checkbox";


export type TaskPropsType = {
    task: TaskType
    todolistID: string
}
export const TaskRedux = React.memo(({task, todolistID}: TaskPropsType) => {
    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => dispatch(removeTaskAC(task.id, todolistID)), [task.id, todolistID])
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistID))
    }, [task.id, todolistID])
    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistID))
    }, [task.id, todolistID])

    return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeStatusHandler}
        />

        <EditableSpan value={task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})