import * as React from 'react';
import styled from '@emotion/styled';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SignInPage } from '../../routes/welcome/SignInPage';
import { observer } from 'mobx-react';
import { ConceptBoardsPage } from '../../routes/manage/ConceptBoardsPage';
import { Routing } from '../../routes/routes';
import { ConceptBoardPage } from '../../routes/content/ConceptBoardPage';
import { useSystem } from '../../hooks/useSystem';
import { motion } from 'framer-motion';

export interface BodyWidgetProps {
  className?: any;
}

export const Redirect = () => {
  const system = useSystem();
  return system.userStore.authenticatedUser ? (
    <Navigate to={Routing.CONCEPTS_BOARDS} />
  ) : (
    <Navigate to={Routing.SIGN_IN} />
  );
};

export const BodyWidget: React.FC<BodyWidgetProps> = observer((props) => {
  const { pathname } = useLocation();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={props.className}
    >
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path={Routing.CONCEPTS_BOARDS} element={<ConceptBoardsPage />} />
        <Route path={Routing.CONCEPTS_BOARD} element={<ConceptBoardPage />} />
        <Route path={Routing.SIGN_IN} element={<SignInPage />} />
      </Routes>
    </motion.div>
  );
});
namespace S {
  export const Container = styled.div``;
}
