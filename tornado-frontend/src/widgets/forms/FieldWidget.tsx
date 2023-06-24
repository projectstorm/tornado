import * as React from 'react';
import { HTMLInputTypeAttribute } from 'react';
import { styled } from '../../theme/theme';

export interface FieldWidgetProps {
  placeholder: string;
  value: string | null;
  onChange: (value: string | null) => any;
  type?: HTMLInputTypeAttribute;
  forwardRef?: React.RefObject<HTMLInputElement>;
}

export const FieldWidget: React.FC<FieldWidgetProps> = (props) => {
  return (
    <S.Input
      ref={props.forwardRef}
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
    border-radius: 3px;
    font-size: 20px;
    color: ${(p) => p.theme.controls.field.color};
    background: ${(p) => p.theme.controls.field.background};
    outline: none;
    width: 100%;
    box-sizing: border-box;

    &::placeholder {
      color: ${(p) => p.theme.controls.field.placeholder};
    }
  `;
}
