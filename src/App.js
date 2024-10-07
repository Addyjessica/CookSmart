import React from 'react';
import Home from './pages/Home';        // Import the Home component
import './styles/App.css';              // Import the CSS for styling
import Navbar from './components/Navbar';

/**
 * App component - The root component that renders the Home page
 */
function App() {
    return (
        <div className="App">
            {/* Render the Home component */}
           <Navbar />
            <Home />
        </div>
    );
}

export default App;
