/**
 * useState Hook - Manage component state
 * The most common hook. Use it to add state to functional components.
 */

import { useState } from 'react';

export function UseStateExample() {
  // Basic counter state
  const [count, setCount] = useState(0);

  // Multiple state variables
  const [name, setName] = useState('John');
  const [age, setAge] = useState(25);

  // State with objects
  const [user, setUser] = useState({
    email: 'john@example.com',
    isActive: true,
  });

  return (
    <div style={{ border: '2px solid blue', padding: '20px', margin: '10px' }}>
      <h2>🎣 useState Hook Examples</h2>

      {/* Example 1: Simple Counter */}
      <div>
        <h3>Simple Counter</h3>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      <hr />

      {/* Example 2: Text Input */}
      <div>
        <h3>Text Input</h3>
        <p>Name: {name}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </div>

      <hr />

      {/* Example 3: Multiple State Variables */}
      <div>
        <h3>Multiple State Variables</h3>
        <p>
          {name} is {age} years old
        </p>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Enter age"
        />
      </div>

      <hr />

      {/* Example 4: State with Object */}
      <div>
        <h3>Object State</h3>
        <p>Email: {user.email}</p>
        <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
        <button
          onClick={() =>
            setUser({
              ...user, // Spread old state
              isActive: !user.isActive, // Update only one property
            })
          }
        >
          Toggle Status
        </button>
      </div>
    </div>
  );
}
