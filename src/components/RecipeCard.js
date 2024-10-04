import React from 'react';

/**
 * RecipeCard component - Displays a single Recipe's image and title
 * @param {Object} Steps - The Recipe object containing details like image and title
 */
const RecipeCard = ({ Steps }) => {
    return (
        <div className="Steps-card">
            {/* Recipe image */}
            <img src={Steps.image} alt={Steps.title} />
            {/* Recipe title */}
            <h3>{Steps.title}</h3>
        </div>
    );
};

export default RecipeCard;
