import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";


export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistACType
    | RemoveTodolistACType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskID)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [
                    {id: v1(), title: action.payload.title, isDone: false},
                    ...state[action.payload.todolistId]
                ]
            }
        case 'CHANGE-TASK-STATUS' :
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE' :
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskID ? {...t, title: action.payload.title} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskID: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {taskID, todolistId}
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistId}
    } as const
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskID, isDone, todolistId}
    } as const
}

export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {taskID, title, todolistId}
    } as const
}