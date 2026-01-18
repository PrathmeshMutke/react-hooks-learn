/**
 * useReducer Hook - Complex state management
 * Like useState but for more complex state logic
 * Similar to Redux actions and reducers
 */

import { useReducer } from 'react';

// Action types
const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  CLEAR: 'CLEAR',
  INCREMENT_LIKES: 'INCREMENT_LIKES',
};

// Reducer function - pure function that defines state transitions
function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          likes: 0,
          completed: false,
        },
      ];

    case ACTIONS.REMOVE:
      return state.filter((todo) => todo.id !== action.payload);

    case ACTIONS.CLEAR:
      return [];

    case ACTIONS.INCREMENT_LIKES:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, likes: todo.likes + 1 } : todo
      );

    default:
      return state;
  }
}

export function UseReducerExample() {
  // Initial state
  const initialState = [
    {
      id: 1,
      title: 'Learn React Hooks',
      likes: 5,
      completed: false,
    },
  ];

  // useReducer takes reducer function and initial state
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const [input, setInput] = useState('');

  // Helper functions to dispatch actions
  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: ACTIONS.ADD, payload: input });
      setInput('');
    }
  };

  const removeTodo = (id) => {
    dispatch({ type: ACTIONS.REMOVE, payload: id });
  };

  const clearAll = () => {
    if (window.confirm('Clear all todos?')) {
      dispatch({ type: ACTIONS.CLEAR });
    }
  };

  const incrementLikes = (id) => {
    dispatch({ type: ACTIONS.INCREMENT_LIKES, payload: id });
  };

  return (
    <div style={{ border: '2px solid purple', padding: '20px', margin: '10px' }}>
      <h2>🔄 useReducer Hook Examples</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>Add New Todo</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Type a todo..."
          style={{ padding: '8px', width: '200px', marginRight: '10px' }}
        />
        <button onClick={addTodo}>Add Todo</button>
        <button onClick={clearAll} style={{ marginLeft: '10px' }}>
          Clear All
        </button>
      </div>

      <h3>Todo List ({todos.length})</h3>
      {todos.length === 0 ? (
        <p style={{ color: 'gray' }}>No todos yet. Add one!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                padding: '10px',
                marginBottom: '8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontWeight: 'bold' }}>{todo.title}</span>
                <span style={{ marginLeft: '10px', color: 'red' }}>
                  ❤️ {todo.likes}
                </span>
              </div>
              <div>
                <button onClick={() => incrementLikes(todo.id)}>
                  Like
                </button>
                <button
                  onClick={() => removeTodo(todo.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Need to import useState for the input field
import { useState } from 'react';
