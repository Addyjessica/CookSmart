

// Base URL for the tasty API
const API_BASE_URL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=100&q=';
const key = "839ea37f2fmsh798b9b58e610d05p1de960jsn98c1f5d0d4d9"


// fetch recipe with api key
export const fetchRecipesByIngredients = async (recipe) => {
    try {
        const response = await fetch(API_BASE_URL + recipe, {
            headers: {
                'x-rapidapi-key': key,
                'x-rapidapi-host': 'tasty.p.rapidapi.com'
            }
        }); // Fetch recipes
        const data = await response.json();
        return data.results; // Return the recipe data
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error; // Handle errors
    }
};
