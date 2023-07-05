import { useSystem } from './useSystem';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { autorun } from 'mobx';

export const useAuthenticated = () => {
  const system = useSystem();
  const navigate = useNavigate();
  useEffect(() => {
    if (!system.userStore.authenticatedUser) {
      navigate('/sign-in');
    }
    return autorun(() => {
      if (!system.userStore.authenticatedUser) {
        navigate('/sign-in');
      }
    });
  }, []);
};

export const useUnAuthenticated = () => {
  const system = useSystem();
  const navigate = useNavigate();
  useEffect(() => {
    return autorun(() => {
      if (system.userStore.authenticatedUser) {
        navigate('/');
      }
    });
  }, []);
};
