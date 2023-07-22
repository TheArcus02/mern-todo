import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TodoInterface } from '../interfaces/interfaces';

export interface TodosState {
  todos: TodoInterface[];
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState: { todos: [] as TodoInterface[] },
  reducers: {
    setTodos: (state, action: PayloadAction<TodoInterface[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<TodoInterface>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<TodoInterface>) => {
      state.todos = state.todos.filter(
        (todo) => todo._id !== action.payload._id,
      );
    },
    updateTodo: (state, action: PayloadAction<TodoInterface>) => {
      const index = state.todos.findIndex(
        (todo) => todo._id === action.payload._id,
      );
      state.todos[index] = action.payload;
    },
  },
});

export const { setTodos, addTodo, removeTodo, updateTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
