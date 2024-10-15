import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, Stack, Grid, Button } from '@mui/joy';

const MealPlanner = ({ mealPlan = {}, setMealPlan, recipe }) => {
  const [mealIngredients, setMealIngredients] = useState({});

  // Retrieve saved ingredients from localStorage when the component mounts
  useEffect(() => {
    const savedMeals = JSON.parse(localStorage.getItem('mealPlannerIngredients')) || {};
    setMealIngredients(savedMeals);
  }, []);

  // Function to handle adding ingredients for a specific meal
  const addIngredientsToMeal = (mealName, ingredients) => {
    const updatedMeals = { ...mealIngredients };
    
    if (!updatedMeals[mealName]) {
      updatedMeals[mealName] = [];
    }

    updatedMeals[mealName] = [...updatedMeals[mealName], ...ingredients];
    
    setMealIngredients(updatedMeals);
    localStorage.setItem('mealPlannerIngredients', JSON.stringify(updatedMeals));
  };

  // Function to handle ingredient deletion for a specific meal
  const handleDelete = (mealName, ingredientToDelete) => {
    const updatedMeals = { ...mealIngredients };
    
    // Remove the selected ingredient from the meal's ingredient list
    updatedMeals[mealName] = updatedMeals[mealName].filter(ingredient => ingredient !== ingredientToDelete);

    // If the meal has no ingredients left, delete the meal entirely
    if (updatedMeals[mealName].length === 0) {
      delete updatedMeals[mealName];
    }

    // Update the state and localStorage
    setMealIngredients(updatedMeals);
    localStorage.setItem('mealPlannerIngredients', JSON.stringify(updatedMeals));
  };

  return (
    <Stack justifyContent="center"
    sx={{
        marginX: 'auto',
        textAlign: 'center',
    }}
    >
      <Typography level="h2" sx={{ mt: 2, mb: 2 }}>Meal Planner</Typography>
      
      {Object.keys(mealIngredients).length > 0 ? (
        <Stack spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.entries(mealIngredients).map(([mealName, ingredients], mealIndex) => (
            <Stack justifyContent="center" key={mealIndex} sx={{ mb: 4, marginX: 'auto' }}>
              {/* Meal Name Header */}
              <Typography level="h4" color="primary" sx={{ mb: 2 }}>
                {mealName}
              </Typography>

              <Stack spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center', }}>
                {ingredients.map((ingredient, index) => (
                    <Card sx={{ p: 2, display: 'flex', flexDirection: 'row', marginX: 'auto', alignItems: 'center', alignContent: 'center', alignSelf: 'center', boxShadow: 'sm', width: '500px', justifyContent: 'space-between' }}>
                      <Typography level="h6" color="neutral" sx={{ mb: 1 }}>
                        {ingredient}
                      </Typography>
                      {/* Delete button for each ingredient */}
                      <Button
                        variant="plain"
                        color="danger"
                        onClick={() => handleDelete(mealName, ingredient)}
                        sx={{ mt: 1 }}
                      >
                        Delete
                      </Button>
                    </Card>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Box sx={{ p: 2, borderRadius: 'md', boxShadow: 'sm', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h6" color="text.secondary">
            No ingredients saved yet.
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default MealPlanner;
