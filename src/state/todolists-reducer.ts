import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const TodolistsReducer = (state: TodolistType[], action: TsarType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.todolistId, title: action.newTodolistTitle, filter: 'all'};
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.newTodolistTitle} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            // let todolist = todolists.find(tl => tl.id === todolistId);
            // if (todolist) {
            //     todolist.filter = value;
            //     setTodolists([...todolists])
            // }
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.newFilter} : el)
        }
        default:
            return state
    }
}

type TsarType = RemoveTodolistACType
    | AddTodolistACType
    | changeTodolistTitleACType
    | ChangeFilterACType

export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST', newTodolistTitle, todolistId: v1()

    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id, newTodolistTitle
        }
    } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id, newFilter
        }
    } as const
}