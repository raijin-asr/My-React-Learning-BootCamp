import React, { useState } from 'react';


export default function Form(props) {
  
  //styling
  const [myStyle1, setMyStyle1] = useState({
      color: "black",
      backgroundColor: "white" /* Optional: Align items vertically */
  })

  const [btnText, setBtnText] = useState("Enable Dark Mode");

  //dark mode
  const toggleDark = () => {
    if(myStyle1.color === "black"){
      setMyStyle1({
        color: "white",
        backgroundColor: "black"
      });
      setBtnText("Enable Light Mode");
    } else {
      setMyStyle1({
        color: "black",
        backgroundColor: "white"
      });
      setBtnText("Enable Dark Mode");
   }
  }

  //copying the text from the textarea
  const handleCopy = () => {
    let text = document.getElementById("input1");
    text.select();
    navigator.clipboard.writeText(text.value);
  }

  //removing extra spaces from the textarea
  const removeExtraSpace = () => {
    let newText = text.split(/[ ]+/); //regex to remove extra spaces
    setText(newText.join(" ")); //to change the value of text by join removed spaced text
  }

  const [text, setText] = useState(" "); //array destructuring
  const [placeholder, setPlaceholder] = useState("Enter some value here"); //array destructuring
  //text= "anbv"; //wrong way to change the value of text
  // setText("New Text"); //to change the value of text
  // setPlaceholder("New Placeholder"); //to change the value of placeholder
  
  const toUpperCase = () => {
    let newText = text.toUpperCase();
    setText(newText); //to change the value of text

    // setText("State changed, and button clicked"); //to change the value of text
  }

  const toLowerCase = () => {
    let newText = text.toLowerCase();
    setText(newText); //to change the value of text
  }

  const handleReset = () => {
    let newText = " ";
    {text === " " ? setText("Enter Text") : setText(newText)}
    setText(newText); //to change the value of text
  }

  //onchange event lets us type in the textarea, else we cant type
  const handleOnChange = (event) => {
    console.log("onChange");
    setPlaceholder("New  Placeholder"); //to change the value of placeholder
    setText(event.target.value); //to add or amend extra text
  }

  return (
    <>
      <div className='container' style={myStyle1}>

      {/* if pass mode from A[p.js 
      <div className='container' style={{color:props.mode==='dark'?'white':'black', backgroundColor:props.mode==='dark'?'white':'black'}}> */}
          <div className="mb-3">
            <h1>{props.heading}</h1>
            <button type="submit" className="btn btn-primary mx-2" onClick={toggleDark}>{btnText}</button>
          </div>
          <div class="mb-3">
              <label htmlFor="label1" class="form-label">Enter words, sentence:</label>
              <textarea class="form-control" id="input1" value={text} placeholder={placeholder} onChange={handleOnChange} rows="6"></textarea>
          </div>
          <div class="pb-3">
            <button type="submit" className="btn btn-primary mx-2" onClick={toUpperCase}>Convert to Uppercase</button>
            <button type="submit" className="btn btn-success mx-2" onClick={toLowerCase}>Convert to Lowercase</button>
            <button type="submit" className="btn btn-danger mx-2" onClick={handleReset}>Reset text</button>
            <button type="submit" className="btn btn-danger mx-2" onClick={handleCopy}>Copy text</button>
            <button type="submit" className="btn btn-success mx-2" onClick={removeExtraSpace}>Remove Extra Space</button>
          </div>
      </div>
      <div className={`container text-${props.mode==='light'?'dark':'light'} my-4`}>
        <h1>Your Data Summary:</h1>
        <p>{text.trim()? text.split(" ").length: 0} words & {text.trim()? text.length:0} characters</p>
        <p>Took {text.trim() ? (text.split(" ").length * 0.008).toFixed(2) : 0} minutes to read</p>
        <h2>Preview</h2>
        <p>{text.length<0?"Enter some text above to preview here":text}</p>
      </div>
    </>
  )
}
