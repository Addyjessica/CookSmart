import React, { useState } from 'react';
import { fetchRecipesByIngredients } from '../api';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

/**
 * Home component - Main page that manages recipe search and results
 */
const Home = () => {
    const [recipes, setRecipes] = useState([]); // State to store the fetched recipes
    const [loading, setLoading] = useState(false); // State to handle loading status
    const [error, setError] = useState(null); // State to handle error messages

    /**
     * Handles the search when the user submits ingredients
     * @param {string} ingredients - The ingredients entered by the user
     */
    const handleSearch = async (ingredients) => {
        setLoading(true); // Set loading to true before fetching
        setError(null);   // Reset any previous error

        try {
            // Fetch the recipes based on the ingredients entered by the user
            const result = await fetchRecipesByIngredients(ingredients);
            setRecipes(result); // Update the recipes state with the result from the API
        } catch (err) {
            // Set error message if fetching fails
            setError('Failed to fetch recipes. Please try again later.');
        } finally {
            setLoading(false); // Set loading to false after fetching is complete
        }
    };

    return (
        <div>
            <h1>CookSmart</h1>
            <SearchBar onSearch={handleSearch} />
            {/* Display loading indicator */}
            {loading && <p>Loading recipes...</p>}
            {/* Display error message if exists */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* Display a list of RecipeCard components for each fetched recipe */}
            <div className="recipe-list">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default Home;
