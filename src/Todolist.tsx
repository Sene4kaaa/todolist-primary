import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const [newTitle, setNewTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    // const allchangeFilterHandler=()=>{
    //     props.changeFilter("all")
    // }
    //
    // const activechangeFilterHandler=()=>{
    //     props.changeFilter("active")
    // }
    //
    // const completedchangeFilterHandler=()=>{
    //     props.changeFilter("completed")
    // }

    const tsarchangeFilterHandler = (valueFilter: FilterValuesType) => {
        props.changeFilter(valueFilter)
    }

    const removeTaskHandler = (tId: string) => {
        props.removeTask(tId)
    }

    const mappedTasks = props.tasks.map(t => {

            // const removeTaskHandler=()=>{
            //     props.removeTask(t.id)
            // }

            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => removeTaskHandler(t.id)}>x</button>
                </li>
            )
        }
    )


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <button onClick={() => tsarchangeFilterHandler("all")}>All</button>
            <button onClick={() => tsarchangeFilterHandler("active")}>Active</button>
            <button onClick={() => tsarchangeFilterHandler("completed")}>Completed</button>
        </div>
    </div>
}
