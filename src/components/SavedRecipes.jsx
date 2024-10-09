import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Stack } from "@mui/joy";

const SavedRecipes = () => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    return (
        <Stack>
            <h1>Saved Recipes</h1>
            {favorites.length === 0 ? (
                <p>No saved recipes yet</p>
            ) : (
                <div className="recipe-list">
                    {
                        favorites.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    }
                </div>

            )}
        </Stack>
    );

};

export default SavedRecipes;