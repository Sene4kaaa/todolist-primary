import React, {useEffect, useState} from 'react'
import axios from "axios";
import {tasksAPI} from "../api/todolist-tasks-api";

export default {
    title: 'API Tasks'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todoId = 'e4197567-ea11-4f03-98aa-a43e0cb82e49'
        const promise = tasksAPI.getTasks(todoId)
        promise.then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = 'b7af3808-5519-4ab2-8db8-2b156682b8d5'
        const title = 'ABRA-KADABDRA'
        tasksAPI.createTask(todoId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = 'e4197567-ea11-4f03-98aa-a43e0cb82e49'
        const taskId = 'f377b771-36a8-4512-9af1-69d0bf693e81'
        tasksAPI.deleteTask(todoId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


