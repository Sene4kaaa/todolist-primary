import React, {FC, memo, useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {
    TodolistDomainType,
    todolistsThunks
} from "features/todolists-list/todolists/todolists.reducer";
import {tasksThunks} from "features/todolists-list/tasks/model/tasks.reducer";
import {useActions} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";
import {FilterTasksButtons} from "features/todolists-list/todolists/todolist/filter-tasks-buttons/filter-tasks-buttons";
import {Tasks} from "features/todolists-list/todolists/todolist/tasks/tasks";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist: FC<Props> = memo(({todolist,tasks}) => {

    const {fetchTasks, addTask} = useActions(tasksThunks);
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks);


    useEffect(() => {
        fetchTasks(todolist.id);
    }, []);

    const addTaskCallback = (title: string) => {
        addTask({title, todolistId: todolist.id})
    }

    const removeTodolistCallback = () => {
        removeTodolist(todolist.id);
    };

    const changeTodolistTitleCallback = (title: string) => {
        changeTodolistTitle({id: todolist.id, title})
    }

    return (
        <div>
            <h3>
                <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback}/>
                <IconButton onClick={removeTodolistCallback} disabled={todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"}/>
            <Tasks todolist={todolist} tasks={tasks}/>
            <div style={{paddingTop: "10px"}}>
                <FilterTasksButtons todolist={todolist}/>
            </div>
        </div>
    );
});
