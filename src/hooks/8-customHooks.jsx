/**
 * Custom Hooks - Reusable logic
 * Extract component logic into reusable functions
 * Prefix with "use" by convention
 */

import { useState, useEffect } from 'react';

// Custom Hook 1: useForm - Handle form state
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm };
}

// Custom Hook 2: useFetch - Fetch data from API
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

// Custom Hook 3: useLocalStorage - Persist state in localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// Custom Hook 4: useToggle - Simple toggle state
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(!value);

  return [value, toggle];
}

// Custom Hook 5: useAsync - Handle async operations
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = async () => {
    setStatus('pending');
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { execute, status, data, error };
}

// Demo components using custom hooks
export function CustomHooksExample() {
  return (
    <div style={{ border: '2px solid brown', padding: '20px', margin: '10px' }}>
      <h2>🪝 Custom Hooks Examples</h2>

      <FormExample />
      <hr />
      <FetchExample />
      <hr />
      <LocalStorageExample />
      <hr />
      <ToggleExample />
      <hr />
      <AsyncExample />
    </div>
  );
}

function FormExample() {
  const { values, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    subscribe: false,
  });

  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        marginBottom: '15px',
      }}
    >
      <h3>useForm Hook</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>
            Name:{' '}
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Your name"
              style={{ marginLeft: '5px', padding: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>
            Email:{' '}
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Your email"
              style={{ marginLeft: '5px', padding: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>
            <input
              type="checkbox"
              name="subscribe"
              checked={values.subscribe}
              onChange={handleChange}
            />
            Subscribe to newsletter
          </label>
        </div>
        <button
          onClick={resetForm}
          style={{ marginTop: '10px' }}
        >
          Reset Form
        </button>
      </form>
      <p style={{ fontSize: '12px' }}>
        Form values: {JSON.stringify(values)}
      </p>
    </div>
  );
}

function FetchExample() {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        marginBottom: '15px',
      }}
    >
      <h3>useFetch Hook</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <div>
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Company:</strong> {data.company.name}
          </p>
        </div>
      )}
    </div>
  );
}

function LocalStorageExample() {
  const [notes, setNotes] = useLocalStorage('my-notes', '');

  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        marginBottom: '15px',
      }}
    >
      <h3>useLocalStorage Hook</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Your notes (saved to localStorage)..."
        style={{
          width: '100%',
          height: '80px',
          padding: '8px',
          marginBottom: '10px',
        }}
      />
      <button onClick={() => setNotes('')}>Clear Notes</button>
      <p style={{ fontSize: '12px', color: 'green' }}>
        ✓ Auto-saved to browser storage!
      </p>
    </div>
  );
}

function ToggleExample() {
  const [isOpen, toggle] = useToggle();

  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        marginBottom: '15px',
      }}
    >
      <h3>useToggle Hook</h3>
      <button onClick={toggle}>
        {isOpen ? 'Hide' : 'Show'} Details
      </button>
      {isOpen && (
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e8f4f8' }}>
          <p>This content is toggled using the useToggle custom hook!</p>
        </div>
      )}
    </div>
  );
}

function AsyncExample() {
  const { execute, status, data, error } = useAsync(() =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('Async operation completed!');
      }, 2000);
    })
  );

  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
      }}
    >
      <h3>useAsync Hook</h3>
      <button onClick={execute}>Execute Async Operation</button>
      <p style={{ marginTop: '10px' }}>
        <strong>Status:</strong> {status}
      </p>
      {data && <p style={{ color: 'green' }}>{data}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}
