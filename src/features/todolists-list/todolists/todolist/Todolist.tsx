import React, {useCallback, useEffect} from "react";
import {Delete} from "@mui/icons-material";
import {Button, IconButton} from "@mui/material";
import {Task} from "features/todolists-list/tasks/ui/task/task";
import {
    TodolistDomainType,
    todolistsActions,
    todolistsThunks
} from "features/todolists-list/todolists/todolists.reducer";
import {tasksThunks} from "features/todolists-list/tasks/model/tasks.reducer";
import {TaskStatuses} from "common/enums";
import {useActions} from "common/hooks";
import {AddItemForm, EditableSpan} from "common/components";
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";

type PropsType = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

// const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
//     changeTodolistFilter({ id, filter });
// }, []);

// const removeTodolist = useCallback(function (id: string) {
//     removeTodolistThunk(id);
// }, []);

// const changeTodolistTitle = useCallback(function (id: string, title: string) {
//     changeTodolistTitleThunk({ id, title });
// }, []);

export const Todolist = React.memo(function (props: PropsType) {

    const {fetchTasks, addTask} = useActions(tasksThunks);
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks);
    const {changeTodolistFilter} = useActions(todolistsActions);

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


    const onAllClickHandler = useCallback(
        () => changeTodolistFilter({filter: "all", id: props.todolist.id}),
        [props.todolist.id],
    );
    const onActiveClickHandler = useCallback(
        () => changeTodolistFilter({filter: "active", id: props.todolist.id}),
        [props.todolist.id],
    );
    const onCompletedClickHandler = useCallback(
        () => changeTodolistFilter({filter: "completed", id: props.todolist.id}),
        [props.todolist.id],
    );

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
                <Button
                    variant={props.todolist.filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickHandler}
                    color={"inherit"}
                >
                    All
                </Button>
                <Button
                    variant={props.todolist.filter === "active" ? "outlined" : "text"}
                    onClick={onActiveClickHandler}
                    color={"primary"}
                >
                    Active
                </Button>
                <Button
                    variant={props.todolist.filter === "completed" ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}
                    color={"secondary"}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});
