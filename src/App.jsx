import { useState } from 'react';
import { UseStateExample } from './hooks/1-useState';
import { UseEffectExample } from './hooks/2-useEffect';
import { UseReducerExample } from './hooks/3-useReducer';
import { ContextProviderExample } from './hooks/4-useContext';
import { UseCallbackExample } from './hooks/5-useCallback';
import { UseMemoExample } from './hooks/6-useMemo';
import { UseRefExample } from './hooks/7-useRef';
import { CustomHooksExample } from './hooks/8-customHooks';
import { UseIdExample } from './hooks/9-useId';
import { UseLayoutEffectExample } from './hooks/10-useLayoutEffect';
import { UseTransitionExample } from './hooks/11-useTransition';
import { UseDeferredValueExample } from './hooks/12-useDeferredValue';
import './App.css';

export default function App() {
  const [activeHook, setActiveHook] = useState(1);

  const hooks = [
    { id: 1, name: 'useState', icon: '🎣' },
    { id: 2, name: 'useEffect', icon: '⏱️' },
    { id: 3, name: 'useReducer', icon: '🔄' },
    { id: 4, name: 'useContext', icon: '🌍' },
    { id: 5, name: 'useCallback', icon: '📌' },
    { id: 6, name: 'useMemo', icon: '💾' },
    { id: 7, name: 'useRef', icon: '🎯' },
    { id: 8, name: 'Custom Hooks', icon: '🪝' },
    { id: 9, name: 'useId', icon: '🆔' },
    { id: 10, name: 'useLayoutEffect', icon: '⏰' },
    { id: 11, name: 'useTransition', icon: '⚡' },
    { id: 12, name: 'useDeferredValue', icon: '⏳' },
  ];

  const renderHook = () => {
    switch (activeHook) {
      case 1:
        return <UseStateExample />;
      case 2:
        return <UseEffectExample />;
      case 3:
        return <UseReducerExample />;
      case 4:
        return <ContextProviderExample />;
      case 5:
        return <UseCallbackExample />;
      case 6:
        return <UseMemoExample />;
      case 7:
        return <UseRefExample />;
      case 8:
        return <CustomHooksExample />;
      case 9:
        return <UseIdExample />;
      case 10:
        return <UseLayoutEffectExample />;
      case 11:
        return <UseTransitionExample />;
      case 12:
        return <UseDeferredValueExample />;
      default:
        return <UseStateExample />;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>⚛️ React Hooks Learning Guide</h1>
        <p>Practical examples of all essential React hooks</p>
      </header>

      <div className="container">
        <nav className="sidebar">
          <h3>Hooks Menu</h3>
          <ul className="hook-list">
            {hooks.map((hook) => (
              <li key={hook.id}>
                <button
                  className={`hook-button ${activeHook === hook.id ? 'active' : ''}`}
                  onClick={() => setActiveHook(hook.id)}
                >
                  <span className="icon">{hook.icon}</span>
                  <span className="name">{hook.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="content">
          <div className="hook-content">
            {renderHook()}
          </div>
        </main>
      </div>

      <footer className="footer">
        <p>💡 Tip: Open the browser console to see logs and learn how hooks work!</p>
        <p>Created with React Hooks for practical learning</p>
      </footer>
    </div>
  );
}
