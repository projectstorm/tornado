import * as React from 'react';
import { useField } from 'formik';
import { FieldWidget } from './FieldWidget';
import { InputContainerWidget } from './InputContainerWidget';
import { HTMLInputTypeAttribute } from 'react';

export interface FormikFieldWidgetProps {
  name: string;
  label: string;
  className?: any;
  type?: HTMLInputTypeAttribute;
}

export const FormikFieldWidget: React.FC<FormikFieldWidgetProps> = (props) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <InputContainerWidget className={props.className} error={meta.error}>
      <FieldWidget
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
