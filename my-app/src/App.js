import './App.css';
import Navbar from './components/Navbar';
import Form from './components/Form';

function App() {
  return (
    <>
       {/* <Navbar />  //for default text */}
      <Navbar title="Raijin2" about="About Us"/>
      <div className="container my-3">
        {/* Form */}
        <Form heading="Raijin Form"/>
      </div>
    </>
  );
}

export default App;
