/**
 * useDeferredValue Hook - Defer updating a value
 * Useful for expensive re-renders without blocking input
 * Like useTransition but for values instead of functions
 */

import { useDeferredValue, useState, useMemo } from 'react';

export function UseDeferredValueExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Generate fake large list
  const items = useMemo(() => {
    const list = [];
    for (let i = 0; i < 5000; i++) {
      list.push({
        id: i,
        title: `Article ${i}`,
        content: `Content about topic ${i % 10}`,
      });
    }
    return list;
  }, []);

  // Filter based on deferred value (non-urgent)
  const filteredItems = useMemo(() => {
    if (!deferredSearchTerm) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    );
  }, [deferredSearchTerm, items]);

  const isStale = searchTerm !== deferredSearchTerm;

  return (
    <div style={{ border: '2px solid lime', padding: '20px', margin: '10px' }}>
      <h2>⏳ useDeferredValue Hook Example</h2>

      <div style={{ marginBottom: '15px' }}>
        <h3>What it does:</h3>
        <p>
          Defers updating a value. Lets urgent updates (like typing) complete before updating
          the deferred value. Input always stays responsive!
        </p>
      </div>

      <hr />

      <h3>1. Search Input (Always Responsive)</h3>
      <div
        style={{
          padding: '15px',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
      >
        <input
          type="text"
          placeholder="Search articles... (input always responsive!)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
        {isStale && (
          <p style={{ color: 'orange', marginTop: '10px', fontSize: '12px' }}>
            🔄 Filtering {filteredItems.length} items...
          </p>
        )}
      </div>

      <hr />

      <h3>2. Comparison: useTransition vs useDeferredValue</h3>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '15px',
          border: '1px solid #ddd',
          fontSize: '14px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Feature</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>useTransition</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>useDeferredValue</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>What it defers</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>State updates</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Values</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>You control</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>When to defer</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Automatic</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Use case</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>setState calls</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Values from props/context</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>isPending</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>✅ Yes</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>❌ No (use ===)</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h3>3. Results ({filteredItems.length} items found)</h3>
      <div
        style={{
          maxHeight: '250px',
          overflow: 'auto',
          padding: '10px',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px',
          border: '1px solid #ddd',
          opacity: isStale ? 0.6 : 1,
        }}
      >
        {filteredItems.length === 0 ? (
          <p style={{ color: 'gray' }}>No articles found</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredItems.slice(0, 15).map((item) => (
              <li
                key={item.id}
                style={{
                  padding: '8px',
                  borderBottom: '1px solid #eee',
                  fontSize: '13px',
                }}
              >
                <strong>{item.title}</strong>
                <p style={{ margin: '3px 0 0 0', color: '#666', fontSize: '12px' }}>
                  {item.content}
                </p>
              </li>
            ))}
            {filteredItems.length > 15 && (
              <li style={{ padding: '8px', color: 'gray', fontStyle: 'italic', fontSize: '12px' }}>
                ... and {filteredItems.length - 15} more articles
              </li>
            )}
          </ul>
        )}
      </div>

      <hr />

      <h3>4. How It Works</h3>
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
        <p>
          <strong>Fast:</strong> <code>searchTerm</code> (instant, from input)
        </p>
        <p>
          <strong>Slow:</strong> <code>deferredSearchTerm</code> (deferred, for filtering)
        </p>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>
          The deferred value lags behind the real value, but input stays responsive!
        </p>
      </div>

      <hr />

      <h3>5. Code Example</h3>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '10px',
          borderRadius: '5px',
          overflow: 'auto',
          fontSize: '12px',
        }}
      >
        {`const [searchTerm, setSearchTerm] = useState('');
const deferredSearchTerm = useDeferredValue(searchTerm);

// deferredSearchTerm lags behind searchTerm
// Great for expensive computations!

const results = useMemo(() => {
  return filter(deferredSearchTerm);
}, [deferredSearchTerm]);`}
      </pre>

      <p style={{ fontSize: '12px', color: 'gray', marginTop: '20px' }}>
        💡 Use useDeferredValue for prop/value changes from parent components!
      </p>
    </div>
  );
}
