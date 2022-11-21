import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

//types
export type FilterValuesType = 'all' | 'active' | 'completed'

const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'Node', isDone: false},
        {id: 3, title: 'Vue', isDone: false},
        {id: 4, title: 'Redux', isDone: true},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodolist = tasks;

    const removeTask = (id: number) => {
        setTasks(tasks.filter(f => f.id !== id));
    };
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    };
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(f => !f.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(f => f.isDone);
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
};

export default App;
