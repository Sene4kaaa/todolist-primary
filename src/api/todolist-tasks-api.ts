import axios from "axios";

const settings = {
    withCredentials: true
}

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
        withCredentials: true
    }
)

export const tasksAPI = {
    getTasks(todoId: string) {
        return instance
            .get<TasksResponseType>(`${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance
            .post<TaskType>(`${todoId}/tasks`, {title})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance
            .delete<TaskType>(`${todoId}/tasks/${taskId}`)
    },
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type TasksResponseType = {
    error: string | null
    totalCount : number
    items: TaskType[]
}