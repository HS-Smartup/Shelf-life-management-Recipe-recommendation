import React, {createContext, useState} from 'react';

const CameraRecipeContext = createContext();

const CameraRecipeContextProvider = ({children}) => {
  const [cameraRecipe, setCameraRecipe] = useState('');

  return (
    <CameraRecipeContext.Provider value={{cameraRecipe, setCameraRecipe}}>
      {children}
    </CameraRecipeContext.Provider>
  );
};

export {CameraRecipeContext, CameraRecipeContextProvider};
