import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState('');
  const [scrollY, setScrollY] = useState(true);

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput,scrollY,setScrollY }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
