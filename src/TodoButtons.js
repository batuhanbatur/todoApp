import React from 'react'
import { ACTIONS } from './TodoForm'

function TodoButtons({ todo, dispatch }) {
  return (
    <div>
      <span style={{color: todo.complete ? '#AAA' : '#000', textDecoration: todo.complete ? 'line-through' : 'none'}}>{todo.name}</span>
      <button onClick={()=> dispatch({type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id }})}>Toggle</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_TODO, payload: {id: todo.id }})}>Delete</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_TODO, payload: {id: todo.id }})}>Edit</button>
    </div>
  )
}

export default TodoButtons