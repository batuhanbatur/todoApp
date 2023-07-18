import React from 'react'
import { useState, useReducer} from 'react'
import { Input } from '@chakra-ui/react'
import TodoButtons from './TodoButtons'


export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
  EDIT_TODO: 'edit-todo'
}

function reducer(todos, action){
  switch (action.type){
    case ACTIONS.ADD_TODO:
      const foundDuplicate = todos.some(todo => todo.name === action.payload.name)
      if (foundDuplicate){
       }
      else if (action.payload.name.length === 0){
      }
      else {
        return [...todos, newTodo(action.payload.name)]
        }
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id){
          return {...todo, complete: !todo.complete};
        }
        return todo;
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos
    case ACTIONS.EDIT_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id){
          return {...todo, isEditing: !todo.isEditing}
        }
      else{
        return todo;
      }
      })
  }
}

function newTodo(name){
  return {id: Date.now(), complete: false, name: name , duplicate: false, isEditing: false}
}

function TodoForm() {
  const [name, setName] = useState('')
  const [todos, dispatch] = useReducer(reducer, [])


  const handleSubmit = e => {
    e.preventDefault()
    dispatch({type: ACTIONS.ADD_TODO, payload: {name: name}})
    setName('')
  }

console.log(todos)

  return (
    <>
      <div className="todo-container">
      Todo App
      <form onSubmit={handleSubmit}>
        <Input htmlSize={4} width='200px' className='todo-input' type="text" value={name} onChange={e => setName(e.target.value)} />
      </form>
        <div>
          {todos.map(todo => {
            return <TodoButtons key={todo.id} todo={todo} dispatch={dispatch} />
          })}
        </div>
      </div>
    </>
  )
}

export default TodoForm