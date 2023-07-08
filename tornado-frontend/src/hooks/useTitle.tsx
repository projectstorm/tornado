import { useEffect } from 'react';
import { autorun } from 'mobx';
import { useSystem } from './useSystem';

export const useTitle = (cb: () => string) => {
  const system = useSystem();
  useEffect(() => {
    return autorun(() => {
      system.updateTitle(cb());
    });
  }, []);
};
