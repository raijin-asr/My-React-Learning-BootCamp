import './App.css';
import Navbar from './components/Navbar';
import Form from './components/Form_WordCounter';
import React, { useState } from 'react';

function App() {
  const [mode, setMode] = useState('light'); //whether dark mode is enabled or not
  
  const toggleMode=()=>{
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor='grey';
    }else{
      setMode('light');
      document.body.style.backgroundColor='white';
    }
  }

  return (
    <>
       {/* <Navbar />  //for default text */}
      <Navbar title="Raijin2" about="About Us" mode={mode} toggleMode={toggleMode}/>
      <div className="container my-3">
        {/* Form */}
        <Form heading="Raijin Word Counter Form" mode={mode}/>
      </div>
    </>
  );
}

export default App;
