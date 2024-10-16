import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import required Router components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './styles/App.css';
import NearbyRestaurants from './pages/NearbyRestaurant';
import SavedRecipes from './components/SavedRecipes';
import MealPlanner from './pages/MealPlanner';

function App() {
  return (
    <Router>
      <div className="App">
        {/* The Navbar will appear on all pages */}
        <Navbar />

        {/* Define routes for different components */}
        <Routes>
          {/* Route for Home page */}
          <Route path="/" element={<Home />} />
          
          {/* Route for Nearby Restaurants page */}
          <Route path="/nearby-restaurants" element={<NearbyRestaurants />} />
          {/* Route for saved recipes page */}
          <Route path="favorite"  element={<SavedRecipes />} />
          {/* Route for meal planner page */}
          <Route path="/planner"  element={<MealPlanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
 