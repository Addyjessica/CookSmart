import React from 'react';

/**
 * RecipeCard component - Displays a single Recipe's image and title
 * @param {Object} Steps - The Recipe object containing details like image and title
 */
const RecipeCard = ( props ) => {
    return (
        <div className="Steps-card">
            {/* Recipe image */}
            <img src={props.strMealThumb} alt={props.IdMeal} />
            {/* Recipe title */}
            <h3>{props.strMeal}</h3>
        </div>
    );
};

export default RecipeCard;
