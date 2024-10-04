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
        <form onSubmit={handleSubmit}>
            {/* Input field for entering ingredients */}
            <input
                type="text"
                placeholder="Enter ingredients"
                value={input}
                onChange={(ev) => setInput(ev.target.value)} // Update the input state as the user types
            />
            {/* Submit button */}
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
