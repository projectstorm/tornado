import * as React from 'react';
import { System } from '../System';
import { useContext } from 'react';

export const SystemContext = React.createContext<System>(null);

export const useSystem = () => {
  return useContext(SystemContext);
};
