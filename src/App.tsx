import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]);
    const [tasks, setTasks] = useState<{ [x: string]: TaskType[] }>({
        [todolistId1]: [
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'Node', isDone: false},
            {id: v1(), title: 'Vue', isDone: false},
            {id: v1(), title: 'Redux', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: false},
        ]
    });

    const removeTask = (todolistId: string, taskId: string) => {
        const filteredTasks = tasks[todolistId].filter( f => f.id !== taskId )
        setTasks({[todolistId]: filteredTasks})
        console.log(filteredTasks);
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        const todolist = todolists.find( f => f.id === todolistId )
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    };
    // const addTask = (title: string) => {
    //     const newTask = {
    //         id: v1(),
    //         title: title,
    //         isDone: false
    //     };
    //     setTasks([newTask, ...tasks]);
    // };
    // const changeTask = (taskId: string, isDone: boolean) => {
    //     const task = tasks.find(f => f.id === taskId);
    //     if (task) {
    //         task.isDone = isDone;
    //         setTasks([...tasks]);
    //     }
    // };


    return (
        <div className="App">
            {
                todolists.map((m, i) => {

                    let tasksForTodolist = tasks[m.id];

                    if (m.filter === 'active') {
                        tasksForTodolist = tasks[m.id].filter(f => !f.isDone);
                    }
                    if (m.filter === 'completed') {
                        tasksForTodolist = tasks[m.id].filter(f => f.isDone);
                    }

                    return <Todolist
                        key={i}
                        todolistId={m.id}
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        // addTask={addTask}
                        // changeTask={changeTask}
                        filter={m.filter}
                    />;
                })
            }
        </div>
    );
};

export default App;
