import * as React from 'react';
import { HTMLInputTypeAttribute } from 'react';
import { styled } from '../../theme/theme';

export interface FieldWidgetProps {
  placeholder: string;
  value: string | null;
  onChange: (value: string | null) => any;
  type?: HTMLInputTypeAttribute;
}

export const FieldWidget: React.FC<FieldWidgetProps> = (props) => {
  return (
    <S.Input
      placeholder={props.placeholder}
      type={props.type}
      value={props.value?.trim() || ''}
      onChange={(event) => {
        let value = event.target.value;
        if (value.trim() === '') {
          value = null;
        }
        props.onChange(value);
      }}
    />
  );
};
namespace S {
  export const Input = styled.input`
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    font-size: 20px;
    color: ${(p) => p.theme.controls.field.color};
    background: ${(p) => p.theme.controls.field.background};
    outline: none;

    &::placeholder {
      color: ${(p) => p.theme.controls.field.placeholder};
    }
  `;
}
