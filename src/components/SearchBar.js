import { Button, Input } from '@mui/joy';
import React, { useState } from 'react';

/**
 * SearchBar component - Renders an input field and a button for searching recipes
 * @param {function} onSearch - Function to handle the search when form is submitted
 */
const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState(''); // State to store the user's input

    /**
     * Handles form submission
     * @param {Event} ev - The form submission event
     */
    const handleSubmit = (ev) => {
        ev.preventDefault();          // Prevent the default form submission behavior (page reload)
        onSearch(input);             // Call the onSearch function passed via props with the user's input
        setInput('');                // Clear the input field after submission
    };

    return (
       <form onSubmit={handleSubmit} 
      style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }} // Center the input
>
  {/* Input field for entering ingredients */}
  <Input
    size="sm"
    sx={{
      '--Input-decoratorChildHeight': '45px',
      maxWidth: '600px',
      width: '100%', // Make input responsive
    }}
    placeholder="Search for recipes"
    type="text"
    value={input}
    onChange={(ev) => setInput(ev.target.value)} // Update the input state as the user types
    endDecorator={
      <Button
        variant="solid"
        color="primary"
        type="submit"
        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        Search
      </Button>
    }
  />
</form>
    );
};

export default SearchBar;
