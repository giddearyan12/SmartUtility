
import {createContext, useContext} from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

export const CityContext = createContext(null)

export const CityProvider = ({ children }) => {
   const [city, setCity] = useState(() => {
    return localStorage.getItem('city') || '';
  });

  useEffect(() => {
    localStorage.setItem('city', city);
  }, [city]);
  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
