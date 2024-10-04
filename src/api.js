

// Base URL for the themealdb API
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast';



// Fetch recipes by ingredients
export const fetchRecipesByIngredients = async (ingredients) => {
   

    try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json()
        console.log(data);
        return data.meals; // Return the recipe data
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error; // Handle errors
    }
};
