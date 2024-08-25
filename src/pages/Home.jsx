import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processData, setError } from '../features/bfhl/bfhlSlice'; 
import './Home.css'; // Ensure you import the CSS file

const Home = () => {
  const dispatch = useDispatch();
  const { response, options, isLoading, isError, message } = useSelector((state) => state.bfhl);
  
  const [jsonInput, setJsonInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Handle JSON input change
  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate JSON
      const parsedData = JSON.parse(jsonInput);

      // Clear previous error
      dispatch(setError(''));

      // Process data with API
      dispatch(processData(parsedData));
    } catch (error) {
      dispatch(setError('Invalid JSON input'));
    }
  };

  // Handle dropdown change
  const handleDropdownChange = (e) => {
    setSelectedOptions([...e.target.options].filter(option => option.selected).map(option => option.value));
  };

  // Filter response based on selected options
  const getFilteredResponse = () => {
    const filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets || [];
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers || [];
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet || [];
    }
    return filteredResponse;
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Home</h1>
      <p className="home-sample-text">Sample Input</p>
      <pre className="home-sample-json">
        {`{
    "data": ["M", "1", "334", "4", "B", "Z", "a"],
    "name": "john",
    "dob" : "5-7-2000",
    "collegeEmailId" : "john@xyz.com",
    "collegeRollNumber":"ABCD123"
}`}
      </pre>
      <form className="home-form" onSubmit={handleSubmit}>
        <label className="home-input-label">API Input:</label>
        <textarea
          className="home-textarea"
          value={jsonInput}
          onChange={handleJsonChange}
          rows="10"
          placeholder='Enter JSON here...'
        />
        <button className="home-submit-button" type="submit" disabled={isLoading}>Submit</button>
      </form>

      {isError && <p className="home-error-message">{message}</p>}

      {options.length > 0 && (
        <div className="home-dropdown-container">
            <div>
            <label className="home-dropdown-label">Multi Filter:</label>
          </div>
          <select
            className="home-dropdown"
            multiple
            onChange={handleDropdownChange}
          >
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="home-response-container">
        <h3 className="home-response-title"> Filtered Response:</h3>
        <pre className="home-response-json">
          {JSON.stringify(getFilteredResponse(), null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Home;


