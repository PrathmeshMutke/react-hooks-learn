/**
 * useId Hook - Generate unique IDs
 * Useful for accessibility and connecting form elements with labels
 */

import { useId, useState } from 'react';

export function UseIdExample() {
  const id = useId();
  const emailId = useId();
  const passwordId = useId();

  const [focusedId, setFocusedId] = useState(null);

  return (
    <div style={{ border: '2px solid indigo', padding: '20px', margin: '10px' }}>
      <h2>🆔 useId Hook Example</h2>

      <div style={{ marginBottom: '15px' }}>
        <h3>What it does:</h3>
        <p>Generates a unique ID that persists across renders and is consistent server/client side.</p>
      </div>

      <hr />

      <h3>1. Form with Labels Connected</h3>
      <div
        style={{
          padding: '15px',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor={emailId}>Email:</label>
          <input
            id={emailId}
            type="email"
            placeholder="your@email.com"
            onFocus={() => setFocusedId(emailId)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
          {focusedId === emailId && (
            <p style={{ fontSize: '12px', color: 'green' }}>✓ Connected with label via ID</p>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor={passwordId}>Password:</label>
          <input
            id={passwordId}
            type="password"
            placeholder="••••••••"
            onFocus={() => setFocusedId(passwordId)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
          {focusedId === passwordId && (
            <p style={{ fontSize: '12px', color: 'green' }}>✓ Connected with label via ID</p>
          )}
        </div>
      </div>

      <hr />

      <h3>2. Generated IDs (for debugging)</h3>
      <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <p>
          <strong>Main ID:</strong> <code>{id}</code>
        </p>
        <p>
          <strong>Email Input ID:</strong> <code>{emailId}</code>
        </p>
        <p>
          <strong>Password Input ID:</strong> <code>{passwordId}</code>
        </p>
        <p style={{ fontSize: '12px', color: 'gray' }}>
          👉 Each ID is unique and consistent. IDs work on server and client!
        </p>
      </div>

      <hr />

      <h3>3. Why useId Matters</h3>
      <ul>
        <li>✅ Accessibility - Connect labels to inputs properly</li>
        <li>✅ Unique - Never conflicts with other IDs</li>
        <li>✅ SSR Safe - Works with server-side rendering</li>
        <li>✅ Consistent - Same ID on server and client</li>
        <li>✅ Simple - No manual ID management</li>
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
        {`const id = useId();

<label htmlFor={id}>Email:</label>
<input id={id} type="email" />`}
      </pre>

      <p style={{ fontSize: '12px', color: 'gray', marginTop: '20px' }}>
        Use useId for form accessibility and avoiding ID conflicts!
      </p>
    </div>
  );
}
