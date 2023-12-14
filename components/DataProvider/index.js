// DataProvider.jsx

"use client"

import { createContext } from 'react';

export const DataContext = createContext();

const DataProvider = ({ children, resetTranscript, transcript }) => {

  return (
    <DataContext.Provider value={{ transcript: transcript, resetTranscript: resetTranscript }}>
      { children }
    </DataContext.Provider>
  )
}

export default DataProvider;