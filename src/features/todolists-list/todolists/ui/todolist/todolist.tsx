import React, {memo, useCallback, useEffect} from "react";
import {TodolistDomainType} from "features/todolists-list/todolists/model/todolists.reducer";
import {tasksThunks} from "features/todolists-list/tasks/model/tasks.reducer";
import {useActions} from "common/hooks";
import {AddItemForm} from "common/components";
import {TaskType} from "features/todolists-list/tasks/api/tasks.api.types";
import {
    FilterTasksButtons
} from "features/todolists-list/todolists/ui/todolist/filter-tasks-buttons/filter-tasks-buttons";
import {Tasks} from "features/todolists-list/todolists/ui/todolist/tasks/tasks";
import {TodolistTitle} from "features/todolists-list/todolists/ui/todolist/todolist-title/todolist-title";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist = memo((props: Props) => {
    const {fetchTasks, addTask} = useActions(tasksThunks);

    useEffect(() => {
        fetchTasks(props.todolist.id);
    }, []);

    const addTaskCallback = useCallback(
        (title: string) => {
            addTask({title, todolistId: props.todolist.id});
        },
        [props.todolist.id],
    );

    return (
        <div>
            <TodolistTitle todolist={props.todolist}/>
            <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === "loading"}/>
            <Tasks todolist={props.todolist} tasks={props.tasks}/>
            <div style={{paddingTop: "10px"}}>
                <FilterTasksButtons todolist={props.todolist}/>
            </div>
        </div>
    );
});
