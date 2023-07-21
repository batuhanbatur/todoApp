import React from "react";
import { ACTIONS } from "./TodoForm";
import { Button } from "@chakra-ui/react";
import { useState, useReducer } from "react";

export default function TodoButtons({ todo, dispatch }){
  const [editedName, setEditedName] = useState(todo.name)
 

  const handleEdit = e => {
    e.preventDefault();
    dispatch({type: ACTIONS.EDIT_TODO, payload: {id: todo.id, isEditing: !todo.isEditing, name: editedName}})

  }

  return (

    <div>
      {!todo.isEditing ? (
              <div>
              <span
        style={{
          color: todo.complete ? "#AAA" : "#000",
          textDecoration: todo.complete ? "line-through" : "none",
        }}
      >{todo.name}</span>
              <Button size="xs" colorScheme="blue" onClick={()=> dispatch({type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id}})}>Toggle</Button>
              <Button size="xs" colorScheme="blue" onClick={()=> dispatch({type: ACTIONS.DELETE_TODO, payload: {id: todo.id}})}>Delete</Button>
              <Button size="xs" colorScheme="blue" onClick={()=> dispatch({type: ACTIONS.EDIT_TODO, payload: {id: todo.id}})}>Edit</Button>
              </div>
      ) :
      (
        <div>
              <form onSubmit={handleEdit}>
              <input
              type="text"
              value={editedName}
              onChange={e => setEditedName(e.target.value)}
              />
              <Button
              size="xs"
              colorScheme="blue"
              onClick={handleEdit}>
              Save</Button>

              </form>


        </div>
      )}
    </div>

  )
}

