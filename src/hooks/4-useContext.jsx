/**
 * useContext Hook - Share state across components
 * Avoid prop drilling by passing data through context
 */

import { createContext, useContext, useState } from 'react';

// Step 1: Create a context
const ThemeContext = createContext();
const UserContext = createContext();

// Step 2: Create a provider component
export function ContextProviderExample() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    isLoggedIn: true,
  });

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Login/Logout
  const logout = () => {
    setUser({ ...user, isLoggedIn: false });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ user, logout }}>
        <div
          style={{
            border: '2px solid orange',
            padding: '20px',
            margin: '10px',
            backgroundColor: theme === 'light' ? '#fff' : '#333',
            color: theme === 'light' ? '#000' : '#fff',
          }}
        >
          <h2>🌍 useContext Hook Example</h2>
          <p>Passing data without prop drilling:</p>

          {/* Nested components that use context */}
          <Header />
          <MainContent />
          <Footer />
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// Component that uses both contexts
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <div
      style={{
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: theme === 'light' ? '#f0f0f0' : '#555',
        borderRadius: '5px',
      }}
    >
      <h3>🏠 Header</h3>
      <p>Theme: {theme}</p>
      <p>Logged in as: {user.isLoggedIn ? user.name : 'Guest'}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

function MainContent() {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: theme === 'light' ? '#f0f0f0' : '#555',
        borderRadius: '5px',
      }}
    >
      <h3>📝 Main Content</h3>
      {user.isLoggedIn ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Please log in to see content</p>
      )}
    </div>
  );
}

function Footer() {
  const { user, logout } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: theme === 'light' ? '#f0f0f0' : '#555',
        borderRadius: '5px',
      }}
    >
      <h3>🔗 Footer</h3>
      <p>Status: {user.isLoggedIn ? '✅ Logged In' : '❌ Logged Out'}</p>
      {user.isLoggedIn && <button onClick={logout}>Logout</button>}
    </div>
  );
}
