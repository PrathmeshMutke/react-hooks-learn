/**
 * useLayoutEffect Hook - Like useEffect but runs synchronously
 * Runs after DOM mutations but before browser paint
 * Use for: Layout calculations, DOM measurements, animations setup
 */

import { useLayoutEffect, useRef, useState } from 'react';

export function UseLayoutEffectExample() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const elementRef = useRef(null);

  // useLayoutEffect runs BEFORE paint - synchronously
  useLayoutEffect(() => {
    console.log('useLayoutEffect: Measuring DOM...');
    if (elementRef.current) {
      setWidth(elementRef.current.clientWidth);
      setHeight(elementRef.current.clientHeight);
    }
  }, []);

  // Compare with useEffect (runs AFTER paint)
  const [effectTime, setEffectTime] = useState('');

  const { useEffect } = require('react');

  useEffect(() => {
    console.log('useEffect: Runs after paint');
    setEffectTime(`Measured at ${new Date().toLocaleTimeString()}`);
  }, []);

  return (
    <div style={{ border: '2px solid orange', padding: '20px', margin: '10px' }}>
      <h2>⏰ useLayoutEffect Hook Example</h2>

      <div style={{ marginBottom: '15px' }}>
        <h3>What it does:</h3>
        <p>
          Runs synchronously after DOM mutations but <strong>before</strong> the browser
          paints. Perfect for measurements!
        </p>
      </div>

      <hr />

      <h3>useLayoutEffect vs useEffect</h3>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '15px',
          border: '1px solid #ddd',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Feature</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>useLayoutEffect</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>useEffect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Runs when?</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Before paint</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>After paint</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Blocking?</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Yes (synchronous)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>No (async)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Use for</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>DOM measurements</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Everything else</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Performance</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Use sparingly</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Preferred</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h3>1. DOM Measurement Example</h3>
      <div
        ref={elementRef}
        style={{
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px',
          marginBottom: '15px',
          border: '2px solid #ccc',
        }}
      >
        <p>This element's size:</p>
        <p>
          <strong>Width:</strong> {width}px
        </p>
        <p>
          <strong>Height:</strong> {height}px
        </p>
      </div>

      <hr />

      <h3>2. When to Use useLayoutEffect</h3>
      <ul>
        <li>✅ Measure DOM elements (width, height, position)</li>
        <li>✅ Adjust DOM based on measurements</li>
        <li>✅ Set up animations before paint</li>
        <li>✅ Prevent visual flashing</li>
      </ul>

      <hr />

      <h3>3. When NOT to Use</h3>
      <ul>
        <li>❌ API calls (use useEffect)</li>
        <li>❌ Data fetching (use useEffect)</li>
        <li>❌ Subscriptions (use useEffect)</li>
        <li>❌ Timers (use useEffect)</li>
      </ul>

      <hr />

      <h3>4. Code Example</h3>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '10px',
          borderRadius: '5px',
          overflow: 'auto',
        }}
      >
        {`useLayoutEffect(() => {
  // Runs BEFORE paint - synchronously
  const width = elementRef.current.clientWidth;
  setWidth(width);
}, []);

useEffect(() => {
  // Runs AFTER paint - asynchronously
  // Use this for most effects!
}, []);`}
      </pre>

      <p style={{ fontSize: '12px', color: 'gray', marginTop: '20px' }}>
        ⚠️ Use useEffect 95% of the time. Only use useLayoutEffect for critical measurements!
      </p>
    </div>
  );
}
