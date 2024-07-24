// Day3: Rendering JSX elements
import './App.css';

const root = ReactDOM.createRoot(
    document.getElementById('root')
    );

function Practice2() {
  return (
    //JSX code: Day3
    <>
    const element = (
        <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    root.render(element);
    setInterval(Practice2, 1000);
    </>
  );
}

export default Practice2;
