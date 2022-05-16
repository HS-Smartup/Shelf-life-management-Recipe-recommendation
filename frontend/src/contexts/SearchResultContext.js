import React, {createContext, useState} from 'react';

const SearchResultContext = createContext();

const SearchResultContextProvider = ({children}) => {
  const [searchResult, setSearchResult] = useState('');

  return (
    <SearchResultContext.Provider value={{searchResult, setSearchResult}}>
      {children}
    </SearchResultContext.Provider>
  );
};

export {SearchResultContext, SearchResultContextProvider};
