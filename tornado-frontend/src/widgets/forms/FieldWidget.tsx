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
    <S.Container
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
  export const Container = styled.input`
    border: none;
    padding: 5px 10px;
    color: ${(p) => p.theme.controls.field.color};
    background: ${(p) => p.theme.controls.field.background};
  `;
}
