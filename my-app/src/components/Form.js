import React from 'react'

export default function Form(props) {
  return (
    <div>
        <h1>{props.heading}</h1>
        <div class="mb-3">
            <label htmlFor="label1" class="form-label">Enter Value:</label>
            <textarea class="form-control" id="input1" rows="6"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Convert to Uppercase</button>
    </div>
  )
}
