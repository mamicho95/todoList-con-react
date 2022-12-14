import React from "react";
import { TodoList } from "./components/TodoList";
import { useState, Fragment, useRef, useEffect } from "react";
import {v4 as uuidv4 } from "uuid"

const KEY = 'todoApp.todos'

export function App(){
    const [todos, setTodos] = useState([
        { id:1, task: "Tarea 1",completed: false }
    ])
    const todoTaskRef = useRef()

    //cagar data de localStorage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY))
        if (storedTodos){
            setTodos(storedTodos)
        }
    },[])

    //Guardar variable en localStorage
    useEffect( () => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    },[todos])

    const toggleTodo = (id) => {
        const newTodos = [...todos]
        const todo = newTodos.find((todo) => todo.id === id)
        todo.completed = !todo.completed
        setTodos(newTodos)
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if(task === '') return;
        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task, completed:false}]

        });
        todoTaskRef.current.value = null
    }
    const handleCleanDone = () => {
        const todosFiltered = todos.filter(todo => !todo.completed)
        setTodos(todosFiltered)
    }
    return (
        <Fragment>
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>
        <button onClick={handleTodoAdd}>+</button>
        <button onClick={handleCleanDone}>-</button>
        <div>Te quedan { todos.filter((todo) => !todo.completed).length } tareas por terminar</div>
        </Fragment>
    )
}