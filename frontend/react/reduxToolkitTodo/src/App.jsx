import { useState } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './toolkit/store'
import AddTodos from './components/addTodo'
import Todos from './components/todos'

function App() {

    return (
        <Provider store={store}>
            <AddTodos />
            <Todos />
        </Provider>
    )
}

export default App
