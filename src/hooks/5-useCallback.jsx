/**
 * useCallback Hook - Memoize functions
 * Prevents unnecessary re-creation of functions on every render
 * Useful for performance optimization with child components
 */

import { useState, useCallback, memo } from 'react';

// Child component that shows if callback changed
const ChildComponent = memo(({ onButtonClick, label }) => {
  console.log(`ChildComponent rendered with label: ${label}`);

  return (
    <div
      style={{
        padding: '10px',
        margin: '10px 0',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
      }}
    >
      <p>Child Component: {label}</p>
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
});

ChildComponent.displayName = 'ChildComponent';

export function UseCallbackExample() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // WITHOUT useCallback - function recreated every render
  const handleClickWithout = () => {
    console.log('Clicked - without useCallback');
  };

  // WITH useCallback - function only recreated when dependencies change
  const handleClickWith = useCallback(() => {
    console.log('Clicked - with useCallback');
  }, []); // Empty dependency array = only created once

  // useCallback with dependencies
  const handleCountClick = useCallback(() => {
    console.log('Current count:', count);
    alert(`Current count is: ${count}`);
  }, [count]); // Recreated when 'count' changes

  return (
    <div style={{ border: '2px solid pink', padding: '20px', margin: '10px' }}>
      <h2>📌 useCallback Hook Example</h2>

      <div
        style={{
          padding: '10px',
          backgroundColor: '#fff3cd',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
      >
        <p>
          <strong>Counter:</strong> {count}
        </p>
        <p>
          <strong>Re-renders:</strong> {renderCount}
        </p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        <button
          onClick={() => setRenderCount(renderCount + 1)}
          style={{ marginLeft: '10px' }}
        >
          Force Re-render
        </button>
      </div>

      <hr />

      <h3>WITHOUT useCallback</h3>
      <p style={{ fontSize: '12px', color: 'gray' }}>
        Function recreated on every render. Child re-renders unnecessarily.
      </p>
      <ChildComponent onButtonClick={handleClickWithout} label="Without Callback" />

      <hr />

      <h3>WITH useCallback</h3>
      <p style={{ fontSize: '12px', color: 'gray' }}>
        Function stays the same (memoized). Child doesn't re-render unless needed.
      </p>
      <ChildComponent onButtonClick={handleClickWith} label="With Callback" />

      <hr />

      <h3>WITH useCallback & Dependencies</h3>
      <p style={{ fontSize: '12px', color: 'gray' }}>
        Function recreated when 'count' dependency changes.
      </p>
      <ChildComponent onButtonClick={handleCountClick} label="With Dependencies" />

      <p style={{ fontSize: '12px', color: 'gray', marginTop: '20px' }}>
        👉 Open console to see which components render and when
      </p>
    </div>
  );
}
