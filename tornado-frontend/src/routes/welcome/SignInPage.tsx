import * as React from 'react';
import styled from '@emotion/styled';
import { CenterPanelWidget } from './widgets/CenterPanelWidget';
import { Formik, useFormik } from 'formik';
import { FormikFieldWidget } from '../../widgets/forms/FormikFieldWidget';
import { ButtonType, ButtonWidget } from '../../widgets/forms/ButtonWidget';
import { useSystem } from '../../hooks/useSystem';
import { useUnAuthenticated } from '../../hooks/useAuthenticated';

export interface SignInPageProps {}

export const SignInPage: React.FC<SignInPageProps> = (props) => {
  useUnAuthenticated();
  const system = useSystem();
  return (
    <S.Container>
      <CenterPanelWidget heading="Welcome" description={'Sign in using your credentials below.'}>
        <Formik<{ email: string; password: string }>
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (values, formikHelpers) => {
            const success = await system.userStore.signIn(values.email, values.password);
            if (!success) {
              formikHelpers.setErrors({
                password: 'Authentication failed'
              });
            }
          }}
        >
          {({ submitForm }) => {
            return (
              <>
                <S.Field label="Email" name="email" />
                <S.Field label="Password" name="password" type="password" submit={true} />
                <ButtonWidget type={ButtonType.PRIMARY} label="Sign in" action={submitForm} />
              </>
            );
          }}
        </Formik>
      </CenterPanelWidget>
    </S.Container>
  );
};
namespace S {
  export const Field = styled(FormikFieldWidget)`
    padding-bottom: 10px;
  `;

  export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  `;
}
