import React, {createContext, useState} from 'react';

const InquireIdContext = createContext();

const InquireIdContextProvider = ({children}) => {
  const [inquireId, setInquireId] = useState('');

  return (
    <InquireIdContext.Provider value={{inquireId, setInquireId}}>
      {children}
    </InquireIdContext.Provider>
  );
};

export {InquireIdContext, InquireIdContextProvider};
