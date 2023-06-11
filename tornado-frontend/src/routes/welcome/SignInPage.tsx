import * as React from 'react';
import styled from '@emotion/styled';
import { CenterPanelWidget } from './widgets/CenterPanelWidget';
import { Formik, useFormik } from 'formik';
import { FormikFieldWidget } from '../../widgets/forms/FormikFieldWidget';
import { ButtonType, ButtonWidget } from '../../widgets/forms/ButtonWidget';
import { useSystem } from '../../hooks/useSystem';

export interface SignInPageProps {}

export const SignInPage: React.FC<SignInPageProps> = (props) => {
  const system = useSystem();
  return (
    <S.Container>
      <CenterPanelWidget heading="Welcome" description={'Sign in using your credentials below.'}>
        <Formik<{ email: string; password: string }>
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (values) => {
            await system.userStore.signIn(values.email, values.password);
          }}
        >
          {({ submitForm }) => {
            return (
              <>
                <FormikFieldWidget label="Email" name="email" />
                <FormikFieldWidget label="Password" name="password" type="password" />
                <ButtonWidget type={ButtonType.PRIMARY} action={submitForm} />
              </>
            );
          }}
        </Formik>
      </CenterPanelWidget>
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  `;
}
