import React, {createContext, useState} from 'react';

const SearchResultItemContext = createContext();

const SearchResultItemContextProvider = ({children}) => {
  const [searchResultItem, setSearchResultItem] = useState([]);

  return (
    <SearchResultItemContext.Provider
      value={{searchResultItem, setSearchResultItem}}>
      {children}
    </SearchResultItemContext.Provider>
  );
};

export {SearchResultItemContext, SearchResultItemContextProvider};
