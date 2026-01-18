/**
 * useRef Hook - Access DOM elements directly & persist values
 * Unlike state, updating ref doesn't trigger re-render
 * Useful for: DOM manipulation, timers, focus, video/audio elements
 */

import { useState, useRef } from 'react';

export function UseRefExample() {
  // Example 1: Direct DOM access
  const inputRef = useRef(null);
  const videoRef = useRef(null);

  // Example 2: Persisting values across renders (won't cause re-render)
  const renderCountRef = useRef(0);
  const [count, setCount] = useState(0);

  // Function to focus input
  const focusInput = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  };

  // Function to clear input
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  // Play/pause video
  const toggleVideo = () => {
    if (videoRef.current) {
      videoRef.current.paused
        ? videoRef.current.play()
        : videoRef.current.pause();
    }
  };

  // Count renders without causing re-render
  renderCountRef.current++;

  return (
    <div style={{ border: '2px solid teal', padding: '20px', margin: '10px' }}>
      <h2>🎯 useRef Hook Example</h2>

      <hr />

      <h3>1. Focus Input Example</h3>
      <div
        style={{
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Click 'Focus' button to focus me"
          style={{ padding: '8px', width: '250px', marginRight: '10px' }}
        />
        <button onClick={focusInput}>Focus Input</button>
        <button onClick={clearInput} style={{ marginLeft: '10px' }}>
          Clear
        </button>
      </div>

      <hr />

      <h3>2. Video Player Example</h3>
      <div
        style={{
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
      >
        <video
          ref={videoRef}
          width="300"
          height="200"
          style={{
            backgroundColor: '#000',
            borderRadius: '5px',
            marginBottom: '10px',
          }}
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser doesn't support HTML5 video.
        </video>
        <br />
        <button onClick={toggleVideo}>Play/Pause Video</button>
      </div>

      <hr />

      <h3>3. Persist Value Without Re-render</h3>
      <div
        style={{
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
          marginBottom: '15px',
        }}
      >
        <p>
          <strong>Component rendered:</strong> {renderCountRef.current} times
        </p>
        <p>
          <strong>State count:</strong> {count}
        </p>
        <button onClick={() => setCount(count + 1)}>Increment State</button>
        <p style={{ fontSize: '12px', color: 'gray' }}>
          ⚠️ Render count increases when state changes, but ref value persists
          without triggering re-renders
        </p>
      </div>

      <hr />

      <h3>4. Practical Example: TextArea with Clear</h3>
      <TextareaClearExample />
    </div>
  );
}

function TextareaClearExample() {
  const textareaRef = useRef(null);
  const charCountRef = useRef(0);

  const handleInput = () => {
    if (textareaRef.current) {
      charCountRef.current = textareaRef.current.value.length;
    }
  };

  const clearTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.value = '';
      charCountRef.current = 0;
      textareaRef.current.focus();
    }
  };

  const getCharCount = () => {
    return charCountRef.current;
  };

  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        border: '1px solid #ccc',
      }}
    >
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        placeholder="Type something..."
        style={{
          width: '100%',
          height: '100px',
          padding: '8px',
          borderRadius: '3px',
          fontFamily: 'monospace',
          marginBottom: '10px',
        }}
      />
      <div>
        <button onClick={clearTextarea}>Clear</button>
        <button onClick={() => alert(`${getCharCount()} characters`)}>
          Get Char Count
        </button>
      </div>
    </div>
  );
}
