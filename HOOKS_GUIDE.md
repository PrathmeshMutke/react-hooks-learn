# 🎓 React Hooks Learning Guide - Step by Step Tutorial

## Welcome! 👋

You now have a fully functional React Hooks learning application. This guide will walk you through each hook with practical examples.

---

## 📚 Complete Hook Reference

### **1. useState - The Basics 🎣**

**What it does:** Adds state to functional components (like `this.state` in class components)

**Syntax:**
```javascript
const [state, setState] = useState(initialValue);
```

**Key Points:**
- First element is the current state value
- Second element is a function to update it
- State can be any type: string, number, object, array, etc.
- Always returns a new value, doesn't mutate

**Common Mistake:** Don't mutate state directly
```javascript
// ❌ WRONG
state.name = 'John';

// ✅ CORRECT
setState({...state, name: 'John'});
```

**When to use:**
- Form inputs
- Toggles/visibility
- Counters
- Any dynamic data that changes

---

### **2. useEffect - Side Effects ⏱️**

**What it does:** Runs side effects after render (API calls, timers, DOM updates, etc.)

**Syntax:**
```javascript
useEffect(() => {
  // Effect code runs here
  return () => {
    // Optional cleanup function
  };
}, [dependencies]);
```

**Dependency Array:**
| Array | Runs When |
|-------|-----------|
| No array | After every render (⚠️ dangerous) |
| `[]` | Only on mount |
| `[dep1, dep2]` | When dep1 or dep2 changes |

**Real-world Examples:**
```javascript
// Fetch data on mount
useEffect(() => {
  fetchData();
}, []);

// Watch a variable
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);

// Timer with cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer); // Cleanup
}, []);
```

**When to use:**
- Fetching data from API
- Setting up subscriptions
- Manual DOM manipulation
- Setting timers/intervals
- Analytics logging

---

### **3. useReducer - Complex State 🔄**

**What it does:** Like useState but for complex state logic (similar to Redux reducers)

**Syntax:**
```javascript
const [state, dispatch] = useReducer(reducer, initialState);

// Dispatch an action
dispatch({ type: 'ACTION_NAME', payload: data });
```

**Reducer Function:**
```javascript
function reducer(state, action) {
  switch(action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
}
```

**When to use:**
- Multiple related state updates
- Complex state logic
- State depends on previous state
- Todo apps, shopping carts, forms
- When you'd consider using Redux

---

### **4. useContext - Global State 🌍**

**What it does:** Share data across components without prop drilling

**How it works:**
```javascript
// 1. Create context
const MyContext = createContext();

// 2. Create provider
function MyProvider({ children }) {
  const [value, setValue] = useState('data');
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

// 3. Use in any nested component
function MyComponent() {
  const { value, setValue } = useContext(MyContext);
}
```

**Use Cases:**
- Theme switching (light/dark mode)
- User authentication
- Language/locale settings
- Notifications
- Any global app state

**Pros:**
- No prop drilling
- Clean component tree
- Centralized state

**Cons:**
- Causes re-renders of all consumers
- Not ideal for frequently changing data

---

### **5. useCallback - Memoize Functions 📌**

**What it does:** Prevents function recreation on every render (performance optimization)

**Syntax:**
```javascript
const memoizedFunction = useCallback(() => {
  // function code
}, [dependencies]);
```

**When It Matters:**
```javascript
// Without useCallback - function recreated every render
const handleClick = () => console.log(count);
<ChildComponent onClick={handleClick} /> // Child re-renders

// With useCallback - function stable across renders
const handleClick = useCallback(() => {
  console.log(count);
}, [count]); // Only changes when count changes
<ChildComponent onClick={handleClick} /> // Child doesn't re-render
```

**When to use:**
- Passing callbacks to optimized child components
- Preventing unnecessary re-renders
- Functions used as dependencies in other hooks
- Event handlers in memoized components

**Rule of thumb:** Use it when you're passing callbacks to child components wrapped with `memo()`

---

### **6. useMemo - Memoize Values 💾**

**What it does:** Caches computed values and only recalculates when dependencies change

**Syntax:**
```javascript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

**Real Example:**
```javascript
// Without useMemo - recalculated on every render
const expensiveValue = fibonacci(40); // SLOW!

// With useMemo - only recalculated when input changes
const expensiveValue = useMemo(() => {
  return fibonacci(40);
}, []);
```

**Performance Considerations:**
- Only use for expensive calculations
- Creating/checking memoization has overhead
- Not a magic performance fix

**When to use:**
- Expensive computations (sorting, filtering large lists)
- Object/array references that affect other hooks
- Passing objects/arrays to memoized components

---

### **7. useRef - DOM Access & Persistence 🎯**

**What it does:** 
1. Access DOM elements directly
2. Persist values across renders WITHOUT causing re-renders

**Syntax:**
```javascript
const ref = useRef(initialValue);
// Access value with: ref.current
```

**Two Use Cases:**

**A) DOM Access:**
```javascript
const inputRef = useRef(null);

const focusInput = () => {
  inputRef.current.focus();
};

return <input ref={inputRef} />;
```

**B) Persist Value Without Re-render:**
```javascript
const renderCountRef = useRef(0);

// This runs after every render
renderCountRef.current++;

// Updated but doesn't trigger re-render
console.log(`Rendered ${renderCountRef.current} times`);
```

**When to use:**
- Managing focus on inputs
- Triggering animations
- Starting/stopping video/audio
- Integrating with third-party DOM libraries
- Storing timer/interval IDs for cleanup
- Tracking previous values

**Remember:** Modifying ref doesn't cause re-render. Use state if you need that!

---

### **8. Custom Hooks - Reusable Logic 🪝**

**What it is:** A JavaScript function that uses React hooks to add custom logic

**Rules:**
1. Must start with "use" (useMyHook)
2. Must call hooks at top level (not inside conditions)
3. Only call from components or other hooks

**Example - useForm:**
```javascript
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => setValues(initialValues);

  return { values, handleChange, resetForm };
}

// Usage
function MyForm() {
  const { values, handleChange, resetForm } = useForm({ name: '', email: '' });
  // ... use values, handleChange, resetForm
}
```

**Real Custom Hooks in the Project:**
- `useForm` - Handle form state
- `useFetch` - Fetch data from API
- `useLocalStorage` - Persist to browser storage
- `useToggle` - Simple boolean toggle
- `useAsync` - Handle async operations

---

## 🎯 Hook Decision Tree

```
Do you need to:

1. Add state to component?
   → useState

2. Run side effects (API, timers, etc)?
   → useEffect

3. Have complex state logic?
   → useReducer

4. Share state across many components?
   → useContext

5. Optimize callback functions?
   → useCallback

6. Cache expensive calculations?
   → useMemo

7. Access DOM directly?
   → useRef

8. Encapsulate reusable logic?
   → Custom Hook
```

---

## 💡 Common Patterns

### **Pattern 1: Fetch Data on Mount**
```javascript
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };
  fetchData();
}, []); // Empty = run once on mount
```

### **Pattern 2: Watch for Changes**
```javascript
useEffect(() => {
  console.log('Count changed to:', count);
}, [count]); // Runs when count changes
```

### **Pattern 3: Form Handling**
```javascript
const [form, setForm] = useState({ name: '', email: '' });

const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};

return (
  <input
    name="name"
    value={form.name}
    onChange={handleChange}
  />
);
```

### **Pattern 4: Toggle State**
```javascript
const [isOpen, setIsOpen] = useState(false);

// Single function to toggle
<button onClick={() => setIsOpen(!isOpen)}>
  {isOpen ? 'Close' : 'Open'}
</button>
```

### **Pattern 5: Conditional Rendering**
```javascript
{loading && <p>Loading...</p>}
{error && <p>Error: {error}</p>}
{data && <div>{data}</div>}
```

---

## ⚠️ Common Mistakes

### **1. Not Including Dependencies**
```javascript
// ❌ WRONG - runs after EVERY render
useEffect(() => {
  console.log(data);
}); // Missing dependency array!

// ✅ CORRECT
useEffect(() => {
  console.log(data);
}, [data]);
```

### **2. Mutating State**
```javascript
// ❌ WRONG
state.items.push(newItem);
setState(state);

// ✅ CORRECT
setState([...state.items, newItem]);
```

### **3. Infinite Loops in useEffect**
```javascript
// ❌ WRONG - causes infinite loop
useEffect(() => {
  setCount(count + 1);
}); // No dependencies!

// ✅ CORRECT
useEffect(() => {
  setCount(count + 1);
}, []); // Run once
```

### **4. Calling Hooks Conditionally**
```javascript
// ❌ WRONG
if (condition) {
  useState(value); // Rules of hooks violated!
}

// ✅ CORRECT
const [state, setState] = useState(condition ? value : null);
```

### **5. Forgetting Cleanup**
```javascript
// ❌ WRONG - memory leak
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  // Forgot to clear!
}, []);

// ✅ CORRECT
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer); // Cleanup!
}, []);
```

---

## 🚀 Next Steps

1. **Play with the examples** - Click around, try different inputs
2. **Open DevTools Console** - See the logs and understand execution
3. **Modify the code** - Change values and observe the results
4. **Create your own** - Build a todo app, weather app, or form
5. **Read the source** - Check the code in `/src/hooks/` files

---

## 📖 Learning Path

### Day 1: Fundamentals
- [ ] Understand useState
- [ ] Play with the counter example
- [ ] Try the form input example
- [ ] Understand state immutability

### Day 2: Side Effects
- [ ] Learn useEffect basics
- [ ] Understand dependency arrays
- [ ] Watch the API call example
- [ ] Try the timer example

### Day 3: Complex State
- [ ] Learn useReducer pattern
- [ ] Understand actions and reducers
- [ ] Play with the todo list

### Day 4: Global State & Optimization
- [ ] Learn useContext for global state
- [ ] Understand useCallback
- [ ] Learn useMemo and when to use it

### Day 5: Advanced Topics
- [ ] Master useRef
- [ ] Create custom hooks
- [ ] Combine multiple hooks

### Day 6-7: Practice Projects
- [ ] Build a todo app
- [ ] Create a weather app
- [ ] Build a shopping cart
- [ ] Make a form with validation

---

## 🎓 Tips for Success

1. **Read the code** - Comments explain everything
2. **Use the console** - Open DevTools to see what's happening
3. **Break things** - Experiment and see what breaks
4. **Ask "why"** - Understand not just "how" but "why"
5. **Practice** - The best way to learn is by doing
6. **Small projects** - Build many small projects
7. **Refactor** - Improve your code as you learn

---

## 📞 Quick Reference

```javascript
// useState - Add state
const [value, setValue] = useState(initial);

// useEffect - Side effects
useEffect(() => {
  // Your effect
  return () => { /* cleanup */ };
}, [dependencies]);

// useReducer - Complex state
const [state, dispatch] = useReducer(reducer, initial);

// useContext - Global state
const value = useContext(MyContext);

// useCallback - Memoize function
const fn = useCallback(() => {}, [deps]);

// useMemo - Memoize value
const value = useMemo(() => computation(), [deps]);

// useRef - DOM access
const ref = useRef(null);
// Usage: <input ref={ref} />

// Custom Hook - Reuse logic
function useCustom() {
  // Use other hooks
  return /* your logic */;
}
```

---

**Now go explore the examples! Click through each hook in the sidebar and interact with them. Happy Learning! 🎉**

