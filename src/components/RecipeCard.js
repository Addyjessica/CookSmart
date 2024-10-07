import { Card, CardContent, CardCover, Modal, Typography } from '@mui/joy';
import React from 'react';
import MealModal from './MealInfoModal';

/**
 * RecipeCard component - Displays a single Recipe's image and title
 * @param {Object} Steps - The Recipe object containing details like image and title
 */

const RecipeCard = ({recipe, loading}) => {
     const [open, setOpen] = React.useState(false);
  return (
    <>
    {
        loading && <div>Loading...</div>
    }
     <Card 
     onClick={() => setOpen(true)} component="li" 
     sx={{ minWidth: 200, flexGrow: 1, margin: 2, 
        // add a box shadow to the card
        boxShadow: '3px 3px 3px rgba(1, 1, 1, 0.3)',
     }}>
        <CardCover>
          <img
            src={recipe.thumbnail_url}
            srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
            loading="lazy"
            alt=""
            style={{
            // add a darken shade
            filter: 'brightness(70%)',
            }}
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
