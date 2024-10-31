import React, { useEffect, useState } from 'react';
import {
  Typography, Box, Card, Stack, Button,
} from '@mui/joy';

const MealPlanner = () => {
  const [mealIngredients, setMealIngredients] = useState({});

  // Retrieve saved ingredients from localStorage when the component mounts
  useEffect(() => {
    const savedMeals = JSON.parse(localStorage.getItem('mealPlannerIngredients')) || {};
    setMealIngredients(savedMeals);
  }, []);

  // Function to handle ingredient deletion for a specific meal
  const handleDelete = (mealName, ingredientToDelete) => {
    const updatedMeals = { ...mealIngredients };

    // Remove the selected ingredient from the meal's ingredient list
    updatedMeals[mealName] = updatedMeals[mealName].filter(
      (ingredient) => ingredient !== ingredientToDelete,
    );

    // If the meal has no ingredients left, delete the meal entirely
    if (updatedMeals[mealName].length === 0) {
      delete updatedMeals[mealName];
    }

    // npm install eslint eslint-plugin-react eslint-plugin-react-hooks --save-dev

    // Update the state and localStorage
    setMealIngredients(updatedMeals);
    localStorage.setItem('mealPlannerIngredients', JSON.stringify(updatedMeals));
  };

  return (
    <Stack
      justifyContent="center"
      sx={{
        marginX: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography level="h2" sx={{ mt: 2, mb: 2 }}>Meal Planner</Typography>

      {Object.keys(mealIngredients).length > 0 ? (
        <Stack spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.entries(mealIngredients).map(([mealName, ingredients]) => (
            <Stack justifyContent="center" key={mealName} sx={{ mb: 4, marginX: 'auto' }}>
              {/* Meal Name Header */}
              <Typography level="h4" color="primary" sx={{ mb: 2 }}>
                {mealName}
              </Typography>

              <Stack spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                {ingredients.map((ingredient) => (
                  <Stack width="100%">
                    <Card
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        marginX: 'auto',
                        alignItems: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                        boxShadow: 'sm',
                        width: '70%',
                        justifyContent: 'space-between',
                      }}
                    >
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
                  </Stack>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Box sx={{
          p: 2, borderRadius: 'md', boxShadow: 'sm', backgroundColor: '#f9f9f9',
        }}
        >
          <Typography variant="h6" color="text.secondary">
            No ingredients saved yet.
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default MealPlanner;
