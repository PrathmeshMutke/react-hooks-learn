# React Hooks Learning Guide - Practical Examples

A comprehensive, hands-on guide to learning React hooks with practical, runnable examples.

## 🎯 What You'll Learn

This project includes practical examples of all essential React hooks:

### 1. **useState** - 🎣 Basic State Management
- Simple counters
- Text input handling
- Multiple state variables
- Object state management

**Use Case:** When you need to add state to a functional component.

### 2. **useEffect** - ⏱️ Side Effects
- Running code after render
- Dependency arrays
- Cleanup functions
- API calls simulation
- Timers and intervals

**Use Case:** For data fetching, subscriptions, manual DOM updates, and timers.

### 3. **useReducer** - 🔄 Complex State Logic
- Action dispatching
- Reducer functions
- Multiple state updates
- Todo list example

**Use Case:** When you have complex state logic with multiple related values.

### 4. **useContext** - 🌍 Global State Sharing
- Context creation
- Provider pattern
- Avoiding prop drilling
- Multi-component state sharing

**Use Case:** To share data across multiple components without prop drilling.

### 5. **useCallback** - 📌 Memoize Functions
- Function memoization
- Performance optimization
- Preventing unnecessary re-renders
- Passing callbacks to optimized components

**Use Case:** To optimize performance when passing callbacks to child components.

### 6. **useMemo** - 💾 Memoize Computations
- Expensive calculations
- Memoized values
- Dependency optimization
- List filtering example

**Use Case:** To avoid expensive recalculations on every render.

### 7. **useRef** - 🎯 Access DOM & Persist Values
- Direct DOM manipulation
- Focus management
- Persisting values without re-renders
- Video player example

**Use Case:** For direct DOM access, managing focus, timers, and video elements.

### 8. **Custom Hooks** - 🪝 Reusable Logic
- `useForm` - Form state management
- `useFetch` - API data fetching
- `useLocalStorage` - Browser storage
- `useToggle` - Simple toggle state
- `useAsync` - Async operations

**Use Case:** Extract reusable logic into custom hooks.

## 📁 Project Structure

```
src/
├── hooks/
│   ├── 1-useState.jsx         # useState examples
│   ├── 2-useEffect.jsx        # useEffect examples
│   ├── 3-useReducer.jsx       # useReducer examples
│   ├── 4-useContext.jsx       # useContext examples
│   ├── 5-useCallback.jsx      # useCallback examples
│   ├── 6-useMemo.jsx          # useMemo examples
│   ├── 7-useRef.jsx           # useRef examples
│   └── 8-customHooks.jsx      # Custom hooks examples
├── App.jsx                    # Main app with navigation
├── App.css                    # Styling
└── main.jsx                   # Entry point
```

## 🚀 Getting Started

### Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open browser:**
Navigate to `http://localhost:5173`

## 💡 How to Use This Guide

1. **Start with useState** - Master the basics of state management
2. **Move to useEffect** - Learn about side effects
3. **Progress through each hook** - Follow the recommended order
4. **Experiment** - Modify the examples and see what happens
5. **Open DevTools Console** - Many examples log to console for better understanding
6. **Create your own components** - Practice by building similar examples

## 🔍 Key Concepts

### Dependency Arrays
- **`[]` (empty)** - Run effect once on mount
- **No array** - Run after every render
- **`[dep1, dep2]`** - Run when dependencies change

### State Updates
- Always return new objects/arrays, don't mutate state
- Use spread operator: `{...state, updated: value}`
- Use array methods: `[...array, newItem]`

### Performance Optimization
- Use `useCallback` to memoize functions
- Use `useMemo` to memoize expensive computations

### Custom Hooks Rules
- Must start with "use"
- Must call other hooks at the top level
- Can't be called conditionally

## 🎓 Learning Path

### Day 1: Fundamentals
- useState
- useEffect (basic)

### Day 2-3: Intermediate
- useReducer
- useContext
- useRef

### Day 4-5: Advanced
- useCallback
- useMemo
- Custom Hooks

## 💻 Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Happy Learning! 🎉** Start with `useState` and work your way through each hook.
