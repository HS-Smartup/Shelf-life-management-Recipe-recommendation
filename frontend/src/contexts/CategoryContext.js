import React, {createContext, useState} from 'react';

const CategoryContext = createContext();

// category context api로 category 나누기
const CategoryContextProvider = ({children}) => {
  const [category, setCategory] = useState('');

  return (
    <CategoryContext.Provider value={{category, setCategory}}>
      {children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryContextProvider};
