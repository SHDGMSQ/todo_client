import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

//types
export type FilterValuesType = 'all' | 'active' | 'completed'

const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'Node', isDone: false},
        {id: v1(), title: 'Vue', isDone: false},
        {id: v1(), title: 'Redux', isDone: true},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodolist = tasks;

    const removeTask = (id: string) => setTasks(tasks.filter(f => f.id !== id));
    const changeFilter = (value: FilterValuesType) => setFilter(value);
    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        setTasks([newTask, ...tasks]);
    };
    const changeTask = (taskId: string, isDone: boolean) => {
        const task = tasks.find(f => f.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
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
                addTask={addTask}
                changeTask={changeTask}
                filter={filter}
            />
        </div>
    );
};

export default App;
