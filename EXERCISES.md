# 🏋️ React Hooks Practice Exercises

These exercises will help you master React hooks through hands-on practice. Start with easy and work your way up!

---

## ✅ Easy Exercises (Beginner)

### Exercise 1: Counter with Step Control
**Goal:** Create a counter that can increment/decrement by a custom step size

**Requirements:**
- ✅ Have a counter display
- ✅ Input field to set the step size
- ✅ Buttons to add/subtract by the step
- ✅ Reset button to go to 0

**Hint:** Use two useState hooks

**Expected Output:**
```
Counter: 15
Step: 5
[+5] [-5] [Reset]
```

---

### Exercise 2: Toggle Multiple Items
**Goal:** Toggle visibility of multiple items independently

**Requirements:**
- ✅ Create 3 different items (e.g., "Item 1", "Item 2", "Item 3")
- ✅ Each has its own show/hide button
- ✅ Display count of visible items
- ✅ "Show All" / "Hide All" buttons

**Hint:** Use state to track which items are visible

---

### Exercise 3: Simple To-Do List
**Goal:** Create a basic to-do app

**Requirements:**
- ✅ Add new todos
- ✅ Display list of todos
- ✅ Mark as complete/incomplete
- ✅ Delete todo
- ✅ Show count of completed vs total

**Hint:** Use useState with array of objects

---

## 🔧 Medium Exercises (Intermediate)

### Exercise 4: Debounced Search
**Goal:** Search through a list with debounce delay

**Requirements:**
- ✅ Input field for search
- ✅ List of items to search through
- ✅ Show results in real-time
- ✅ Add 300ms delay before searching (debounce)
- ✅ Show "Searching..." while waiting

**Hint:** Use useEffect with cleanup, useRef, and setTimeout

**Example Items:**
```javascript
['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt']
```

---

### Exercise 5: Form with Validation
**Goal:** Create a registration form with real-time validation

**Requirements:**
- ✅ Fields: Username, Email, Password, Confirm Password
- ✅ Real-time validation:
  - Username: 3-20 characters, no spaces
  - Email: Valid email format
  - Password: 8+ chars, uppercase, number, special char
  - Confirm: Must match password
- ✅ Show error messages
- ✅ Disable submit button while invalid
- ✅ Success message on submit

**Hint:** Use useState, useEffect for validation on change

---

### Exercise 6: Local Storage Todo App
**Goal:** Todo app that persists to localStorage

**Requirements:**
- ✅ Create todos (persists after refresh)
- ✅ Mark as complete (persists)
- ✅ Delete todos (persists)
- ✅ Show stats (total, completed, remaining)
- ✅ Clear all button

**Hint:** Save to localStorage in useEffect, load on mount

---

## 🚀 Hard Exercises (Advanced)

### Exercise 7: Paginated List with Filtering & Sorting
**Goal:** Show a large list with pagination, filtering, and sorting

**Requirements:**
- ✅ Display list of 50+ items (use dummy data)
- ✅ Pagination: Show 10 items per page
- ✅ Filter: By category/status
- ✅ Sort: By name/date/popularity
- ✅ Search: Real-time search through results
- ✅ Remember filter/sort/page on change

**Hint:** Use useReducer for complex state, useMemo for filtering/sorting

**Dummy Data:**
```javascript
const items = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  category: ['A', 'B', 'C'][i % 3],
  created: new Date(Date.now() - i * 86400000)
}));
```

---

### Exercise 8: Shopping Cart with Context
**Goal:** Global shopping cart using useContext

**Requirements:**
- ✅ Product list page
- ✅ Add/remove items from cart
- ✅ Update quantities
- ✅ Cart summary shows total
- ✅ Cart persists with localStorage
- ✅ Use useContext for global state
- ✅ Use custom hook for cart logic

**Challenge:** Multiple pages (Products, Cart) sharing state via Context

---

### Exercise 9: Custom Hook: useLocalStorage
**Goal:** Create a reusable hook for localStorage

**Requirements:**
- ✅ Hook takes key and initial value
- ✅ Returns [value, setValue]
- ✅ Automatically syncs to localStorage
- ✅ Works like useState
- ✅ Handle JSON serialization
- ✅ Handle JSON parsing errors

**Usage:**
```javascript
const [name, setName] = useLocalStorage('userName', 'Guest');
```

---

### Exercise 10: Custom Hook: useFetch with Caching
**Goal:** Fetch data with automatic caching

**Requirements:**
- ✅ Hook takes URL
- ✅ Returns { data, loading, error }
- ✅ Cache results (don't re-fetch same URL)
- ✅ Handle loading state
- ✅ Handle errors
- ✅ Allow manual refetch
- ✅ Cleanup on unmount

**Usage:**
```javascript
const { data, loading, error, refetch } = useFetch(url);
```

---

## 🎯 Project Ideas (Real-World)

### Project 1: Weather App
- Fetch weather data from free API
- Search by city name
- Display current weather + forecast
- Switch between Celsius/Fahrenheit
- Show weather icon/animations
- Save favorite cities

**APIs:** OpenWeatherMap, WeatherAPI (free tier available)

---

### Project 2: GitHub User Finder
- Search GitHub users
- Display user profile info
- Show user's repositories
- Display followers/following
- Link to GitHub profile
- Show user stats/charts

**API:** GitHub REST API (free, no auth needed for basic requests)

---

### Project 3: Notes App
- Create, read, update, delete notes
- Rich text editor
- Categories/tags
- Search notes
- Sort by date/name
- Pin important notes
- Export as JSON/PDF
- Dark mode toggle
- Persist with localStorage

---

### Project 4: Recipe App
- Search recipes
- Filter by ingredients/cuisine/diet
- Display recipe details
- Save favorite recipes
- Shopping list generator
- Nutrition info
- User ratings

**APIs:** Spoonacular, Edamam (free tier)

---

### Project 5: Movie Database
- Search movies
- Filter by genre/year/rating
- Display movie details
- Cast information
- Save to watchlist
- Show recommendations
- User ratings

**API:** OMDB, TMDb (free tier)

---

## 🧪 Testing Your Exercises

### Checklist for Each Exercise:
- [ ] Code runs without errors
- [ ] All requirements are met
- [ ] State updates correctly
- [ ] Re-renders happen at right time
- [ ] No infinite loops
- [ ] No memory leaks
- [ ] Code is readable and commented
- [ ] Error handling works
- [ ] Edge cases handled

---

## 💪 Level Up Tips

### When Stuck:
1. Break it into smaller pieces
2. Check the DevTools Console
3. Use console.log to debug
4. Read the React docs
5. Look at similar examples

### Code Quality:
- Keep functions small
- Name things clearly
- Comment complex logic
- Use constants for magic numbers
- Don't repeat yourself (DRY)

### Performance:
- Use React DevTools Profiler
- Look for unnecessary renders
- Memoize expensive computations
- Use useCallback for callbacks

### Testing Ideas:
- Add unit tests with Jest
- Add integration tests
- Test edge cases
- Test error scenarios

---

## 📝 Solution Strategies

### For useState exercises:
1. Identify what state you need
2. Create useState for each piece
3. Create functions to update state
4. Render the state
5. Connect handlers to functions

### For useEffect exercises:
1. Identify side effects needed
2. Write effect code
3. Set up dependency array
4. Add cleanup if needed
5. Test on mount/unmount

### For useReducer exercises:
1. Define state shape
2. Define action types
3. Write reducer function
4. Initialize useReducer
5. Dispatch actions from handlers

### For useContext exercises:
1. Create context
2. Create Provider component
3. Wrap app with Provider
4. Use useContext in components
5. Update context value as needed

---

## 🎓 Reflection Questions

After completing exercises, ask yourself:

1. **Did I understand the why?**
   - Not just how to implement, but why this approach?

2. **Could I explain it to someone else?**
   - Can you teach what you learned?

3. **Where else could I use this pattern?**
   - Think of real-world applications

4. **What was the hardest part?**
   - What confused you?

5. **How would I optimize this?**
   - Performance improvements?
   - Code structure improvements?

---

## 🚀 After Mastering Hooks

When you've completed these exercises and feel comfortable with hooks:

1. **Learn Advanced Topics:**
   - React.memo()
   - Performance optimization
   - Code splitting
   - Lazy loading

2. **State Management:**
   - Redux Toolkit
   - Zustand
   - Recoil
   - Context + useReducer

3. **Real Projects:**
   - Build a real app
   - Deploy to production
   - Get user feedback
   - Iterate and improve

4. **Next Skills:**
   - TypeScript with React
   - Testing (Jest, React Testing Library)
   - Server-side rendering (Next.js)
   - Static site generation

---

## 📚 Solution Resources

When you're stuck, check these in order:
1. Comments in the original examples
2. React Hooks documentation
3. Stack Overflow
4. ChatGPT/AI (explain concept, don't ask for code)
5. YouTube tutorials

---

**Remember:** The goal isn't to memorize, it's to understand! Take your time, experiment, and don't be afraid to break things. That's how you learn! 🎉

Good luck! 💪

