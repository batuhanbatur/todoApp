import React from 'react'
import { ACTIONS } from './TodoForm'
import { Button } from '@chakra-ui/react'


function TodoButtons({todo, dispatch}) {

  return (
    <div>
      <span style={{color: todo.complete ? '#AAA' : '#000', textDecoration: todo.complete ? 'line-through' : 'none'}}>{todo.name}</span>
      <Button size="xs" colorScheme='blue' onClick={()=> dispatch({type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id }})}>Toggle</Button>
      <Button size="xs" colorScheme='blue' onClick={()=> dispatch({type: ACTIONS.DELETE_TODO, payload: {id: todo.id }})}>Delete</Button>
      <Button size="xs" colorScheme='blue' onClick={()=> todo.isEditing? alert('hello'): alert('not hello')}>Edit</Button>
    </div>
  )
}

export default TodoButtons

