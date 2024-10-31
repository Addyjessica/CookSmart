// Base URL for the themealdb API
const API_BASE_URL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=100&q=';
const key = 'ae9be13c9dmsh08a763309d8919dp177e3bjsnd908af216122';

// fetch recipe with api key
const fetchRecipesByIngredients = async (recipe) => {
  try {
    const response = await fetch(API_BASE_URL + recipe, {
      headers: {
        'x-rapidapi-key': key,
        'x-rapidapi-host': 'tasty.p.rapidapi.com',
      },
    }); // Fetch recipes
    const data = await response.json();
    return data.results; // Return the recipe data
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error; // Handle errors
  }
};

export default fetchRecipesByIngredients;
