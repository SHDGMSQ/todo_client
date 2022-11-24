import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {log} from 'util';

//types
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    // addTask: (title: string) => void
    // changeTask: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist: React.FC<TodolistType> = (
    {
        todolistId,
        title,
        tasks,
        removeTask,
        changeFilter,
        // addTask,
        // changeTask,
        filter
    }) => {

    //state
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    //callbacks
    // const addTaskHandler = () => {
    //     if (taskTitle.trim() === '') {
    //         setError('Title is required');
    //         return;
    //     }
    //     addTask(taskTitle.trim());
    //     setTaskTitle('');
    // };
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.key === 'Enter') {
    //         addTaskHandler();
    //     }
    // };
    const onAllClickHandler = () => changeFilter(todolistId, 'all');
    const onActiveClickHandler = () => changeFilter(todolistId, 'active');
    const onCompletedClickHandler = () => changeFilter(todolistId, 'completed');
    const onClickInputAfterError = () => setError(null);

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    onClick={onClickInputAfterError}
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    // onKeyPress={onKeyPressHandler}
                />
                {/*<button onClick={addTaskHandler}>+</button>*/}
                <div className="error-message">{error}</div>
            </div>
            <ul>
                {
                    tasks.map((m, i) => {

                            const removeTaskHandler = () => removeTask(todolistId, m.id);
                            // const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            //     changeTask(m.id, e.currentTarget.checked);
                            // };

                            return (
                                <li key={i} className={m.isDone? 'isDone': ''} >
                                    <input
                                        type="checkbox"
                                        checked={m.isDone}
                                        // onChange={changeTaskHandler}
                                    />
                                    <span>{m.title}</span>
                                    <button onClick={removeTaskHandler}>x
                                    </button>
                                </li>
                            );
                        }
                    )
                }
            </ul>
            <button
                className={filter === 'all' ? 'active-filter' : ''}
                onClick={onAllClickHandler}>
                All
            </button>
            <button
                className={filter === 'active' ? 'active-filter' : ''}
                onClick={onActiveClickHandler}>
                Active
            </button>
            <button
                className={filter === 'completed' ? 'active-filter' : ''}
                onClick={onCompletedClickHandler}>
                Completed
            </button>
        </div>
    );
};