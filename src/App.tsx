import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

const App = () => {

    const task1 = [
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'Node', isDone: false},
        {id: 3, title: 'Vue', isDone: false},
    ]

    const task2 = [
        {id: 1, title: 'Hello', isDone: true},
        {id: 2, title: 'bla', isDone: false},
        {id: 3, title: 'teach', isDone: true},
    ]


    return (
        <div className='App'>
            <Todolist title='What to learn' tasks={task1}/>
            <Todolist title='Lets go' tasks={task2}/>
        </div>
    );
};

export default App;
