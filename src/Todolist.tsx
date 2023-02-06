import React, {useState} from 'react';
import {ButtonNameType} from "./App";

export  type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:number)=> void
    // filteringTask:(buttonName: ButtonNameType)=>void
}

export function Todolist(props: PropsType) {

    let [filterTask,setFilterTask]=useState<ButtonNameType>('All')



    const filteringTask = (buttonName: ButtonNameType) => {
        setFilterTask(buttonName)
    }

    let filteredTasks = props.tasks
    if (filterTask === 'Active') {
        filteredTasks = props.tasks.filter(el => el.isDone)
    }
    if (filterTask === 'Completed') {
        filteredTasks = props.tasks.filter(el => !el.isDone)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {filteredTasks.map((el) => {
                return (
                    <li key={el.id}>
                        <button onClick={()=>{props.removeTask(el.id)}}>x</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}

        </ul>
        <div>
            {/*<button onClick={()=>{props.filteringTask('All')}}>All</button>*/}
            {/*<button onClick={()=>{props.filteringTask('Active')}}>Active</button>*/}
            {/*<button onClick={()=>{props.filteringTask('Completed')}}>Completed</button>*/}
            <button onClick={()=>{filteringTask('All')}}>All</button>
            <button onClick={()=>{filteringTask('Active')}}>Active</button>
            <button onClick={()=>{filteringTask('Completed')}}>Completed</button>
        </div>
    </div>
}
