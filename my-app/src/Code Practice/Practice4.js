// Day5: state and lifecycle:
// In Rendering Elements, we have only learned one way to update the UI. We call root.render() to change the rendered output:

const root1 = ReactDOM.createRoot(document.getElementById('root'));
  
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element); // This is the only way to update the UI
}

setInterval(tick, 1000);

// Learn how to make the Clock component truly reusable and encapsulated. It will set up its own timer and update itself every second.
// We can start by encapsulating how the clock looks:
//made extra CLock function and passed props to it

const root2 = ReactDOM.createRoot(document.getElementById('root'));

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);

// Converting a Function to a Class
class Clock extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }

//   Adding Local State to a Class:

// 1. Replace this.props.date with this.state.date in the render() method:
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

// 2.Add a class constructor that assigns the initial this.state:
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

// 3.Remove the "date" prop from the <Clock /> element:
root.render(<Clock />);


// The result looks like this:

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);

//Adding Lifecycle Methods to a Class:
// --important to free up resources taken by the components when they are destroyed
// --declare special methods on the component class to run some code when a component mounts and unmounts
// --These methods are called “lifecycle methods”.

// 1. mounting: setup a time when clock is rendered to the DOM for the first time
// --The componentDidMount() method runs after the component output has been rendered to the DOM. This is a good place to set up a timer:

componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(), //arrow function to call tick() method
        1000
    );
}

//2.  clear that timer whenever the DOM produced by the Clock is removed
// --tear down the timer in the componentWillUnmount() lifecycle method:

  componentWillUnmount() {
    clearInterval(this.timerID); //clears the timer
  }

//   Finally, we will implement a method called tick() that the Clock component will run every second.
//   It will use this.setState() to schedule updates to the component local state:
  
  class Clock extends React.Component {
    constructor(props) { //react calls constructor with props
      super(props);
      this.state = {date: new Date()}; //initial state
    }
  
    componentDidMount() { //mounting
      this.timerID = setInterval(
        () => this.tick(), //calls tick method every second
        1000
      );
    }
  
    componentWillUnmount() { //unmounting
      clearInterval(this.timerID);
    }
  
    tick() { //tick method, called every second, is another lifecycle method
      this.setState({ //setState() schedules an update to a component’s state object
        date: new Date() //knows state has changed, calls render() again
      });
    }
  
    render() { //renders the clock in this.state.date
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
  }
  
  const root3 = ReactDOM.createRoot(document.getElementById('root'));
  root3.render(<Clock />);

//Using State Correctly
// There are three things you should know about setState()

// 1. Do Not Modify State Directly
// Wrong
this.state.comment = 'Hello';

// Instead, use setState():

// Correct
this.setState({comment: 'Hello'});

// 2.State Updates May Be Asynchronous
// Wrong
this.setState({ //it accepts an object
    counter: this.state.counter + this.props.increment,
  });

// instead,  use a second form of setState() that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:
// Correct with arrow function
this.setState((state, props) => ({ //accepts a function
    counter: state.counter + props.increment
  }));
  
// Correct with regular function
this.setState(function(state, props) {
    return {
      counter: state.counter + props.increment
    };
  });

// 3.State Updates are Merged
// For example, your state may contain several independent variables:

  constructor(props) {
    super(props);
    this.state = {
      posts: [], //empty array or independent variables
      comments: [] //empty array or independent variables
    };
  }

// Then you can update them independently with separate setState() calls:

  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({ //updating posts with separate setState() calls
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({ //updating comments with separate setState() calls
        comments: response.comments
      });
    });
  }

// --The Data Flows Down:
function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
  }

// --imagine a component tree as a waterfall of props, each component’s state is like an additional water source that joins it at an arbitrary point but also flows down.
//-To show that all components are truly isolated, we can create an App component that renders three <Clock>s:

    function App() {
        return (
        <div>
            {/* Each Clock sets up its own timer and updates independently. */}
            <Clock />
            <Clock />
            <Clock />
        </div>
        );
    }

// Final result:
function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
  }
  
  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <FormattedDate date={this.state.date} /> //passing date as props to FormattedDate component
        </div>
      );
    }
  }
  
  function App() {
    return (
      <div>
        <Clock />
        <Clock />
        <Clock />
      </div>
    );
  }
  
  const root4 = ReactDOM.createRoot(document.getElementById('root'));
  root4.render(<App />);

  //output:
// Hello, world!
// It is 4:31:01 PM.
// Hello, world!
// It is 4:31:01 PM.
// Hello, world!
// It is 4:31:01 PM.