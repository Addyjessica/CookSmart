import React, { useState } from 'react';
import { fetchRecipesByIngredients } from '../api';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { Box, Card, CardContent, CardCover, CircularProgress, Stack, Typography } from '@mui/joy';

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
            console.log(result);
            setRecipes(result); // Update the recipes state with the result from the API\
        } catch (err) {
            // Set error message if fetching fails
            setError('Failed to fetch recipes. Please try again later.');
        } finally {
            setLoading(false); // Set loading to false after fetching is complete
        }
    };

    return (
        <Stack marginTop={10} paddingX={5}>
            <Stack>
                <Typography level='h3' textAlign='left'>What's on your mind?</Typography>
                <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
                    <CardCover>
                        <img
                            src="https://wallpapers.com/images/hd/food-4k-m37wpodzrcbv5gvw.jpg"
                            srcSet="https://wallpapers.com/images/hd/food-4k-m37wpodzrcbv5gvw.jpg"
                            loading="lazy"
                            style={{
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                            }}
                            alt=""
                        />
                    </CardCover>
                    <CardContent>
                        <Typography
                            level="h2"
                            textAlign="left"
                            textColor="#fff"
                            sx={{ fontWeight: 'lg', mt: { xs: 12, sm: 18 } }}
                        >
                            Glorious Meals Fucking <br /> cock suckers
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
            <h1>CookSmart</h1>
            <SearchBar onSearch={handleSearch} />
            {/* Display loading indicator */}
            {loading ?
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress />
                </Box>
                : <div className="recipe-list">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} loading={loading} />
                    ))}
                </div>}
        </Stack>
    );
};

export default Home;
