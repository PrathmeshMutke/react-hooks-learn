/**
 * useTransition Hook - Mark updates as transitions
 * Allows non-urgent updates to be interrupted by urgent ones
 * Great for: Search, filtering, complex rendering
 */

import { useTransition, useState, useMemo } from 'react';

export function UseTransitionExample() {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');

  // Generate fake large list
  const items = useMemo(() => {
    const list = [];
    for (let i = 0; i < 10000; i++) {
      list.push({
        id: i,
        name: `Item ${i}`,
        category: ['Electronics', 'Books', 'Clothing', 'Food'][i % 4],
        price: Math.floor(Math.random() * 100) + 10,
      });
    }
    return list;
  }, []);

  // Expensive filter operation
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, items]);

  // Handle search WITHOUT transition (blocks)
  const handleSearchNormal = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search WITH transition (non-blocking)
  const handleSearchTransition = (e) => {
    const value = e.target.value;
    startTransition(() => {
      setSearchTerm(value);
    });
  };

  return (
    <div style={{ border: '2px solid cyan', padding: '20px', margin: '10px' }}>
      <h2>⚡ useTransition Hook Example</h2>

      <div style={{ marginBottom: '15px' }}>
        <h3>What it does:</h3>
        <p>
          Marks state updates as transitions. Allows urgent updates (like input) to interrupt
          non-urgent updates (like rendering 10,000 items).
        </p>
      </div>

      <hr />

      <h3>1. With Transition (Recommended - Responsive!)</h3>
      <div
        style={{
          padding: '15px',
          backgroundColor: '#e8f5e9',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
      >
        <input
          type="text"
          placeholder="Search items... (with useTransition - responsive!)"
          onChange={handleSearchTransition}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
        {isPending && (
          <p style={{ color: 'orange', marginTop: '10px' }}>🔄 Rendering {filteredItems.length} items...</p>
        )}
        <p style={{ marginTop: '10px' }}>
          Results: <strong>{filteredItems.length}</strong> items found
        </p>
      </div>

      <hr />

      <h3>2. Performance Comparison</h3>
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
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Approach</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>How it feels</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Use case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Normal setState</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Might lag when rendering many items</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Small lists</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>useTransition</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Input stays responsive!</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Large lists, complex renders</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h3>3. Results Preview</h3>
      <div
        style={{
          maxHeight: '200px',
          overflow: 'auto',
          padding: '10px',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px',
          border: '1px solid #ddd',
        }}
      >
        {filteredItems.length === 0 ? (
          <p style={{ color: 'gray' }}>No items found</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredItems.slice(0, 20).map((item) => (
              <li
                key={item.id}
                style={{
                  padding: '5px',
                  borderBottom: '1px solid #eee',
                  fontSize: '14px',
                }}
              >
                <strong>{item.name}</strong> - {item.category} (${item.price})
              </li>
            ))}
            {filteredItems.length > 20 && (
              <li style={{ padding: '5px', color: 'gray', fontStyle: 'italic' }}>
                ... and {filteredItems.length - 20} more items
              </li>
            )}
          </ul>
        )}
      </div>

      <hr />

      <h3>4. When to Use useTransition</h3>
      <ul>
        <li>✅ Search/filter with large lists</li>
        <li>✅ Complex data transformations</li>
        <li>✅ Heavy computations</li>
        <li>✅ Keep input responsive</li>
      </ul>

      <hr />

      <h3>5. Code Example</h3>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '10px',
          borderRadius: '5px',
          overflow: 'auto',
        }}
      >
        {`const [isPending, startTransition] = useTransition();

const handleSearch = (value) => {
  startTransition(() => {
    setSearchTerm(value);
  });
};

{isPending && <p>Loading...</p>}`}
      </pre>

      <p style={{ fontSize: '12px', color: 'gray', marginTop: '20px' }}>
        💡 Use transitions for expensive updates that should yield to urgent user input!
      </p>
    </div>
  );
}
