import axios from 'axios';

// Your Spoonacular API key (replace with your actual API key)
const API_KEY = 'YOUR_SPOONACULAR_API_KEY';

// API URL to fetch recipes based on ingredients
const API_URL = 'https://api.spoonacular.com/recipes/findByIngredients';

/**
 * Fetch recipes by ingredients using the Spoonacular API
 * @param {string} ingredients - Comma-separated list of ingredients entered by the user
 * @returns {Promise<Array>} - Array of recipe objects
 */
export const fetchRecipesByIngredients = async (ingredients) => {
    try {
        // Sending a GET request to the API with ingredients and your API key
        const response = await axios.get(API_URL, {
            params: {
                ingredients: ingredients, // ingredients parameter
                number: 10,               // number of recipes to fetch
                apiKey: API_KEY,           // API key parameter
            },
        });
        // Return the data (recipes) from the API response
        return response.data;
    } catch (error) {
        // Log an error message if the API request fails
        console.error('Error fetching recipes:', error);
        return [];
    }
};
