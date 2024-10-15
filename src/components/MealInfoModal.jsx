import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Box, Card, CardContent, CardCover, Stack } from '@mui/joy';

export default function MealModal({ open, setOpen, setData }) {
  const [showTags, setShowTags] = React.useState(false); // State to control tag visibility
  const [load, setLoad] = React.useState(false); // State to control loading state

  const toggleTags = () => {
    setShowTags(prev => !prev); // Toggle the state
  };

  const handleSave = () => {
    setLoad(true);
  
    if (setData?.sections[0]?.components) {
      // Extract the plural names of the ingredients
      const ingredientPlurals = setData.sections[0].components.map(component => 
        component.ingredient.display_plural
      );
      
      // Get the existing saved meals and ingredients from localStorage
      const savedMeals = JSON.parse(localStorage.getItem('mealPlannerIngredients')) || {};
  
      // Save the current meal and its ingredients
      savedMeals[setData.name] = ingredientPlurals;
  
      // Update the localStorage with the new meal-ingredient pair
      localStorage.setItem('mealPlannerIngredients', JSON.stringify(savedMeals));
  
      
    } else {
      setLoad(false);
      console.log('No ingredients found to save.');
    }
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{ maxWidth: 800, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: 'lg', mb: 1 }}
          >
            {setData?.name}
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
           {setData?.description}
          </Typography>
          {/* Video goes here */}
          <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <video
            autoPlay
            loop
            muted
            poster={setData?.thumbnail_url}
          >
            <source
              src={setData?.original_video_url}
              type="video/mp4"
            />
          </video>
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            textColor="#fff"
            sx={{ fontWeight: 'lg', mt: { xs: 12, sm: 18 } }}
          >
            Video
          </Typography>
        </CardContent>
      </Card>
            <Typography level="h4" sx={{ mb: 2, textAlign: 'center' }}>
        Cooking Instructions
      </Typography>
       <Box 
        sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 3,
        maxHeight: 200,
        overflowY: 'scroll',
        // Custom scrollbar styles
        '&::-webkit-scrollbar': {
          width: '0.4rem',
        },
        '&::-webkit-scrollbar-track': {
          background: '#ddd',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
        },
      }}>
      <Stack spacing={2}>
        {setData?.instructions.map((step) => (
          <Box key={step.id} sx={{ p: 2, border: '1px solid #ccc', borderRadius: 'md', backgroundColor: '#f9f9f9' }}>
            <Typography level="h6" sx={{ mb: 1 }}>
              Step {step.position}
            </Typography>
            <Typography>{step.display_text}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
        <Button 
        onClick={handleSave}
        loading={load}
        >
          Generate Shopping List
        </Button>
           <Button onClick={toggleTags} variant="plain" color='danger' sx={{ mt: 1 }}>
            {showTags ? 'Hide Tags' : 'Show Tags'}
          </Button>
          {showTags && (
            <Stack flexDirection="row" gap={1} maxHeight={200} flexWrap="wrap" sx={{ 
                mt: 2, overflowY: 'scroll',
                 '&::-webkit-scrollbar': {
          width: '0.4rem',
        },
        '&::-webkit-scrollbar-track': {
          background: '#ddd',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
        },
                 }}>
              {setData?.tags?.map((tag) => (
                <Button size='sm' key={tag.name} variant="soft">
                  {tag.name}
                </Button>
              ))}
            </Stack>
          )}
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
