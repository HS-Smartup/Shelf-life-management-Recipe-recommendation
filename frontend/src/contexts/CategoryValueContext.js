import React, {createContext, useState} from 'react';

const CategoryValueContext = createContext();

// categoryValue context api로 categoryValue 나누기
const CategoryValueContextProvider = ({children}) => {
  const [categoryValue, setCategoryValue] = useState('');

  return (
    <CategoryValueContext.Provider value={{categoryValue, setCategoryValue}}>
      {children}
    </CategoryValueContext.Provider>
  );
};

export {CategoryValueContext, CategoryValueContextProvider};
