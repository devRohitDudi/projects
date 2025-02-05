import { createSlice, nanoid } from '@reduxjs/toolkit';

const nisiState = {
    todos: [{ id: 1, text: 'Learn react Redux' }],
}

export const todoSlice = createSlice({
    name: "todos",
    initialState: nisiState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },

        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state[index].text = action.payload.text;
            }
        }


    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer