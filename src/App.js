import React from 'react';
import Home from './pages/Home';        // Import the Home component
import './styles/App.css';              // Import the CSS for styling

/**
 * App component - The root component that renders the Home page
 */
function App() {
    return (
        <div className="App">
            {/* Render the Home component */}
            <Home />
        </div>
    );
}

export default App;
