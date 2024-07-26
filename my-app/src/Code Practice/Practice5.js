// Dya6: Hooks

// Hooks are functions that let you “hook into” React state and lifecycle features from function components.
//Hooks allow you to reuse stateful logic without changing your component hierarchy
//Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

// Hooks are backwards-compatible. 
// types: State Hook, Effect Hook, Custom Hooks

// unction components in React look like this:

const Example = (props) => {
  // You can use Hooks here!
  return <div />;
}

// or this:

function Example(props) {
  // You can use Hooks here!
  return <div />;
}
// You might have previously known these as “stateless components

// 1. State Hook
// This example renders a counter. When you click the button, it increments the value:
//It’s similar to this.setState in a class, except it doesn’t merge the old and new state together.import React, { useState } from 'react';

// useState is a Hook that lets you add React state to function components. We’ll learn other Hooks later.

import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// Declaring a State Variable
// In a class, we initialize the count state to 0 by setting this.state to { count: 0 } in the constructor:

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  
// In a function component, we have no this, so we can’t assign or read this.state. Instead, we call the useState Hook directly inside our component:

import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

// Declaring multiple state variables
// You can use the State Hook more than once in a single component:

function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}

// Hooks and Function Components


// 2. Effect Hook
// You’ve likely performed data fetching, subscriptions, or manually changing the DOM from React components before. We call these operations “side effects” (or “effects” for short) because they can affect other components and can’t be done during rendering.

// The Effect Hook, useEffect, adds the ability to perform side effects from a function component. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.

// For example, this component sets the document title after React updates the DOM:

import React, { useState, useEffect } from 'react';

//put following in codePen: to render output
const { useState } = React;
const { createRoot } = ReactDOM;

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

//put this too to display output:
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Example/>);



// Effects may also optionally specify how to “clean up” after them by returning a function. For example, this component uses an effect to subscribe to a friend’s online status, and cleans up by unsubscribing from it:
// In this example, React would unsubscribe from our ChatAPI when the component unmounts, as well as before re-running the effect due to a subsequent render.
import React, { useState, useEffect } from 'react';

function FriendStatus(props) { //send props
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

// Just like with useState, you can use more than a single effect in a component:

function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  
  useEffect(() => { //one effect
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => { //another effect
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
}

// Rules of Hooks----------------
// Hooks are JavaScript functions, but they impose two additional rules:

// a. Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
// b. Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions. (There is just one other valid place to call Hooks — your own custom Hooks.

//3. Building Your Own Hooks
// Sometimes, we want to reuse some stateful logic between components. 

//Earlier we used a FriendStatus component that calls the useState and useEffect Hooks to subscribe to a friend’s online status. Let’s say we also want to reuse this subscription logic in another component.

// First, we’ll extract this logic into a custom Hook called useFriendStatus:

import React, { useState, useEffect } from 'react';

//here use is prefix in the function name FriendStatus component, so its a custom hook
function useFriendStatus(friendID) { //here friendID is a parameter
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

//Now we can use it(useFriendStatus) from both components:

function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id); //here useFriendStatus is called which is a custom hook

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

//another component using useFriendStatus
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id); //here useFriendStatus is called which is a custom hook

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}

// The state of each component is completely independent. Hooks are a way to reuse stateful logic, not state itself. In fact, each call to a Hook has a completely isolated state — so you can even use the same custom Hook twice in one component.

// Custom Hooks are more of a convention than a feature. If a function’s name starts with ”use” and it calls other Hooks, we say it is a custom Hook. The useSomething naming convention is how our linter plugin is able to find bugs in the code using Hooks.

//Other Hooks
// There are a few less commonly used built-in Hooks that you might find useful. For example, useContext lets you subscribe to React context without introducing nesting:

//useContext hook:  The useContext Hook lets you subscribe to React context without introducing nesting. In this example, useContext reads the current theme context from the closest ThemeProvider above and re-renders when it changes:
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
 }

// And useReducer lets you manage local state of complex components with a reducer:

//useReducer hook: The useReducer Hook lets you manage local state of complex components with a reducer. For example, this component manages a list of todos with a useReducer Hook:
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
}