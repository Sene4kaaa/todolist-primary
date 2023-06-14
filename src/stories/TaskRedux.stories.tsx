import type {Meta, StoryObj} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {action} from '@storybook/addon-actions'
import {renameSync} from "fs";
import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import AppWithRedux from "../AppWithRedux";
import {Provider, useSelector} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {TaskRedux} from "../TaskRedux";
import {TaskType} from "../Todolist";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskRedux> = {
    title: 'TODOLISTS/TaskRedux',
    component: TaskRedux,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof TaskRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TaskReduxWrap = () => {
    const todolistID = 'todolistId1'
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistID][0])

    return <TaskRedux task={task} todolistID={todolistID} />
}

export const AppWithReduxStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    render: () => <TaskReduxWrap/>
}