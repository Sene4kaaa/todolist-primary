import React, { useEffect} from "react";
import {Delete} from "@mui/icons-material";
import { IconButton} from "@mui/material";
import {Task} from "features/todolists-list/tasks/ui/task/task";
import {
    TodolistDomainType,
    todolistsThunks
} from "features/todolists-list/todolists/todolists.reducer";
import {tasksThunks} from "features/todolists-list/tasks/model/tasks.reducer";
import {TaskStatuses} from "common/enums";
import {useActions} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";
import {FilterTasksButtons} from "features/todolists-list/todolists/todolist/filterTasksButtons/filter.tasks.buttons";

type PropsType = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist = React.memo(function (props: PropsType) {

    const {fetchTasks, addTask} = useActions(tasksThunks);
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks);


    useEffect(() => {
        fetchTasks(props.todolist.id);
    }, []);

    const addTaskCallback = (title: string) => {
        addTask({title, todolistId: props.todolist.id})
    }

    const removeTodolistCallback = () => {
        removeTodolist(props.todolist.id);
    };

    const changeTodolistTitleCallback = (title: string) => {
        changeTodolistTitle({id: props.todolist.id, title})
    }

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleCallback}/>
                <IconButton onClick={removeTodolistCallback} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {tasksForTodolist.map((t) => (
                    <Task
                        key={t.id}
                        task={t}
                        todolistId={props.todolist.id}

                    />
                ))}
            </div>
            <div style={{paddingTop: "10px"}}>
                <FilterTasksButtons todolist={props.todolist}/>
            </div>
        </div>
    );
});
