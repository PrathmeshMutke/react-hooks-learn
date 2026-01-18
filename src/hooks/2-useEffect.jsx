/**
 * useEffect Hook - Side effects in functional components
 * Handle API calls, subscriptions, DOM updates, timers, etc.
 */

import { useState, useEffect } from 'react';

export function UseEffectExample() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // Example 1: Effect runs after EVERY render
  useEffect(() => {
    console.log('Effect runs after every render. Current count:', count);
  });

  // Example 2: Effect runs only on mount (empty dependency array)
  useEffect(() => {
    console.log('Component mounted! This runs ONCE');
    return () => {
      console.log('Cleanup: Component will unmount');
    };
  }, []);

  // Example 3: Effect runs when dependencies change
  useEffect(() => {
    console.log('Count changed to:', count);
  }, [count]);

  // Example 4: Simulating API call
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setData({
        id: 1,
        name: 'React Hooks',
        description: 'Learn React the modern way',
      });
      setLoading(false);
    }, 2000);

    // Cleanup function
    return () => {
      console.log('Cleanup: Clearing API call timeout');
      clearTimeout(timer);
    };
  }, []); // Only run once on mount

  // Example 5: Timer with cleanup
  useEffect(() => {
    if (timer === 0) return; // Don't set up timer if it's 0

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    // Cleanup function to clear interval
    return () => {
      console.log('Cleanup: Clearing interval');
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <div style={{ border: '2px solid green', padding: '20px', margin: '10px' }}>
      <h2>⏱️ useEffect Hook Examples</h2>

      {/* Counter with effect dependency */}
      <div>
        <h3>Counter (watch the console)</h3>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>

      <hr />

      {/* API call simulation */}
      <div>
        <h3>API Call Simulation</h3>
        {loading ? (
          <p>Loading data...</p>
        ) : data ? (
          <div>
            <p>
              <strong>{data.name}</strong>
            </p>
            <p>{data.description}</p>
          </div>
        ) : null}
      </div>

      <hr />

      {/* Timer with cleanup */}
      <div>
        <h3>Timer (with cleanup)</h3>
        <p>Timer: {timer}s</p>
        <button onClick={() => setTimer(10)}>Start 10s Timer</button>
        <button onClick={() => setTimer(0)}>Stop Timer</button>
      </div>

      <p style={{ fontSize: '12px', color: 'gray' }}>
        👉 Open console to see effect logs and cleanup messages
      </p>
    </div>
  );
}
