import { useState } from 'react';
import "./RouteForm.css"

const ArrayTextArea = ( ) => {
  const [array, setArray] = useState([]);

  const addElement = (event) => {
    if (event.key === "Enter") {
      const elementInput = event.target;
      const element = elementInput.value.trim();
      event.preventDefault()

      if (element !== "") {
        setArray(prevArray => [...prevArray, element]);
        elementInput.value = ""; // Clear input field
      }
    }
  };

  const removeElement = (index) => {
    setArray(prevArray => prevArray.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="array-container">
        {array.map((element, index) => (
          <div className="array-element" key={index}>
            {element}
            <span className="remove-icon" onClick={() => removeElement(index)}>
              &#10005;
            </span>
          </div>
        ))}
      </div>
      <input type="text" id="elementInput" className='input' onKeyPress={addElement} />
      {/* <p>{routeType}</p> */}
    </div>
  );
};

export default ArrayTextArea;
