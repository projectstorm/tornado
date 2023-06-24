import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import { FieldWidget } from './FieldWidget';
import { InputContainerWidget } from './InputContainerWidget';
import { HTMLInputTypeAttribute, useEffect, useRef } from 'react';

export interface FormikFieldWidgetProps {
  name: string;
  label: string;
  className?: any;
  type?: HTMLInputTypeAttribute;
  submit?: boolean;
}

export const FormikFieldWidget: React.FC<FormikFieldWidgetProps> = (props) => {
  const [field, meta, helpers] = useField(props.name);
  const context = useFormikContext();

  const ref = useRef<HTMLInputElement>();
  useEffect(() => {
    if (props.submit) {
      const listener = (e: KeyboardEvent) => {
        if (e.code.toLowerCase() === 'enter') {
          context.submitForm();
        }
      };

      ref.current.addEventListener('keydown', listener);
      return () => {
        ref.current?.removeEventListener('keydown', listener);
      };
    }
  }, []);
  return (
    <InputContainerWidget className={props.className} error={meta.error}>
      <FieldWidget
        forwardRef={ref}
        type={props.type}
        placeholder={props.label}
        value={field.value}
        onChange={(value) => {
          helpers.setValue(value);
        }}
      />
    </InputContainerWidget>
  );
};
