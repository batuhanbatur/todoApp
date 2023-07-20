import * as React from "react";
import TodoForm from "./TodoForm";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

export default function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <TodoForm />
      </div>
    </ChakraProvider>
  );
}
