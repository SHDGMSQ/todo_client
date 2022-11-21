import React, {MouseEventHandler} from 'react';
import {FilterValuesType} from './App';

//types
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type TodolistType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export const Todolist: React.FC<TodolistType> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
    }) => {

    const removeTaskHandler = (id: number) => removeTask(id);
    const changeFilterAllHandler = () => changeFilter('all');
    const changeFilterActiveHandler = () => changeFilter('active');
    const changeFilterCompletedHandler = () => changeFilter('completed');

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map((m, i) => {

                            const removeTaskCallback = () => removeTaskHandler(m.id);

                            return (
                                <li key={i}>
                                    <input
                                        type="checkbox"
                                        checked={m.isDone}
                                    />
                                    <span>{m.title}</span>
                                    <button onClick={removeTaskCallback}>x
                                    </button>
                                </li>
                            );
                        }
                    )
                }
            </ul>
            <button onClick={changeFilterAllHandler}>All</button>
            <button onClick={changeFilterActiveHandler}>Active</button>
            <button onClick={changeFilterCompletedHandler}>Completed</button>
        </div>
    );
};