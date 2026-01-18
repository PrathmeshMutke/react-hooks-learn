/**
 * useMemo Hook - Memoize expensive calculations
 * Prevents expensive computations on every render
 * Only recalculates when dependencies change
 */

import { useState, useMemo } from 'react';

// Expensive calculation function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // WITHOUT useMemo - calculated every render
  const fibWithout = fibonacci(35); // Takes a while!

  // WITH useMemo - calculated only when dependency changes
  const fibWith = useMemo(() => {
    console.log('Calculating fibonacci...');
    return fibonacci(35);
  }, []); // Empty dependency = calculated once

  // useMemo with dependencies
  const [fibInput, setFibInput] = useState(30);
  const fibWithDeps = useMemo(() => {
    console.log('Calculating fibonacci with input:', fibInput);
    return fibonacci(fibInput);
  }, [fibInput]); // Recalculate when fibInput changes

  // Expensive list filtering
  const [searchTerm, setSearchTerm] = useState('');
  const items = useMemo(() => {
    console.log('Filtering items...');
    const allItems = [
      'Apple',
      'Apricot',
      'Banana',
      'Blueberry',
      'Cherry',
      'Carrot',
      'Date',
      'Dragon Fruit',
      'Elderberry',
      'Eggplant',
    ];
    return allItems.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div style={{ border: '2px solid red', padding: '20px', margin: '10px' }}>
      <h2>💾 useMemo Hook Example</h2>

      <div
        style={{
          padding: '10px',
          backgroundColor: '#fff3cd',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
      >
        <p>
          <strong>Re-renders:</strong> {renderCount}
        </p>
        <button onClick={() => setRenderCount(renderCount + 1)}>
          Force Re-render
        </button>
      </div>

      <hr />

      <h3>1. Fibonacci Calculation</h3>

      <div style={{ marginBottom: '15px' }}>
        <p>
          <strong>WITHOUT useMemo:</strong> Slow (calculated every render)
        </p>
        <p>Fibonacci(35) = {fibWithout}</p>
      </div>

      <div>
        <p>
          <strong>WITH useMemo:</strong> Fast (calculated once)
        </p>
        <p>Fibonacci(35) = {fibWith}</p>
      </div>

      <hr />

      <h3>2. With Dependencies</h3>

      <div>
        <label>
          Fibonacci input:
          <input
            type="number"
            value={fibInput}
            onChange={(e) => setFibInput(Number(e.target.value))}
            min="0"
            max="40"
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <p>
          Fibonacci({fibInput}) = {fibWithDeps}
        </p>
      </div>

      <hr />

      <h3>3. Expensive Filtering</h3>

      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search fruits/vegetables..."
          style={{ padding: '8px', width: '250px' }}
        />
        <p>
          Found {items.length} item{items.length !== 1 ? 's' : ''}:
        </p>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <p style={{ fontSize: '12px', color: 'gray', marginTop: '20px' }}>
        👉 Open console to see "Calculating..." logs. Force re-renders don't
        trigger recalculations unless dependencies change!
      </p>
    </div>
  );
}
