import * as React from 'react';
import { useState } from 'react';
import { ButtonType } from '../forms/ButtonWidget';
import { DialogWidget, DialogWidgetProps } from './DialogWidget';
import { FieldWidget } from '../forms/FieldWidget';

export interface InputDialogWidgetProps extends Omit<DialogWidgetProps, 'btns'> {
  initial?: string;
  submit: (value: string) => any;
  cancel: () => any;
}

export const InputDialogWidget: React.FC<InputDialogWidgetProps> = (props) => {
  const [value, setValue] = useState(props.initial);

  return (
    <DialogWidget
      {...props}
      btns={[
        {
          label: 'Submit',
          action: async () => {
            props.submit(value);
          },
          type: ButtonType.PRIMARY
        },
        {
          label: 'Cancel',
          action: async () => {
            props.cancel();
          },
          type: ButtonType.NORMAL
        }
      ]}
    >
      <FieldWidget
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
        placeholder=""
      />
    </DialogWidget>
  );
};
