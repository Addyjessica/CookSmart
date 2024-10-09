import { Card, CardContent, CardCover, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import MealModal from './MealInfoModal';
import { BiStar } from 'react-icons/bi';

/**
 * RecipeCard component - Displays a single Recipe's image and title
 * @param {Object} Steps - The Recipe object containing details like image and title
 */

const RecipeCard = ({ recipe, loading }) => {
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(savedFavorites.some((favRecipe) => favRecipe.id === recipe.id));
  }, [recipe.id]);

  // Function to handle toggling favorite status
  const handleFavoriteClick = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = savedFavorites.filter((favRecipe) => favRecipe.id !== recipe.id);
    } else {
      // Add to favorites
      updatedFavorites = [...savedFavorites, recipe];
    }

    // Update the favorites in localStorage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Update the local state
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      <Card 
        onClick={() => setOpen(true)} 
        component="li"
        sx={{ 
          minWidth: 200, 
          flexGrow: 1, 
          margin: 2,
          boxShadow: '3px 3px 3px rgba(1, 1, 1, 0.3)',
        }}
      >
        <CardCover>
          <img
            src={recipe.thumbnail_url}
            loading="lazy"
            alt=""
            style={{ filter: 'brightness(70%)' }}
          />
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            textColor="#fff"
            sx={{ fontWeight: 'lg', mt: { xs: 12, sm: 18 } }}
          >
            {recipe.name}
          </Typography>
          <Typography
            sx={{
              color: 'yellow',
              fontSize: 19,
              padding: 1,
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer', // Make the star clickable
            }}
            textAlign="left"
            padding={0}
            margin={0}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event from firing
              handleFavoriteClick();
            }}
          >
            <BiStar
              style={{
                fontSize: 24,
                color: isFavorite ? 'yellow' : 'gray', // Change color if favorited
              }}
            />
            {isFavorite ? 'Favorited' : 'Add to Favorites'}
          </Typography>
        </CardContent>
      </Card>
      <MealModal
        open={open}
        setOpen={setOpen}
        setData={recipe}
      />
    </>
  );
};

export default RecipeCard;
