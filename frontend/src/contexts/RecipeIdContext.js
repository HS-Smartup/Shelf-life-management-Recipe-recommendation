import React, {createContext, useState} from 'react';

const RecipeIdContext = createContext();

const RecipeIdContextProvider = ({children}) => {
  const [recipeId, setRecipeId] = useState('');

  return (
    <RecipeIdContext.Provider value={{recipeId, setRecipeId}}>
      {children}
    </RecipeIdContext.Provider>
  );
};

export {RecipeIdContext, RecipeIdContextProvider};
