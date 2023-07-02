import * as React from 'react';
import { Layer, LayerStore } from './LayerStore';
import { DialogWidget } from '../widgets/dialog/DialogWidget';
import { ButtonType } from '../widgets/forms/ButtonWidget';
import { InputDialogWidget } from '../widgets/dialog/InputDialogWidget';
import { Simulate } from 'react-dom/test-utils';
import submit = Simulate.submit;

export interface DialogStoreOptions {
  layerStore: LayerStore;
}

export interface CommonDialogOptions {
  title: string;
  desc: string;
}

export class DialogStore {
  constructor(protected options: DialogStoreOptions) {}

  async showConfirmDialog(options: CommonDialogOptions): Promise<boolean> {
    return await new Promise<boolean>((resolve) => {
      let confirm = false;
      const layer = new Layer(() => {
        return (
          <DialogWidget
            title={options.title}
            desc={options.desc}
            btns={[
              {
                label: 'Confirm',
                action: async () => {
                  confirm = true;
                  layer.dispose();
                },
                type: ButtonType.PRIMARY
              },
              {
                label: 'Cancel',
                action: async () => {
                  layer.dispose();
                },
                type: ButtonType.NORMAL
              }
            ]}
          />
        );
      });
      const l1 = layer.registerListener({
        disposed: () => {
          l1();
          resolve(confirm);
        }
      });

      this.options.layerStore.addLayer(layer);
    });
  }

  async showInputDialog(options: CommonDialogOptions & { initial?: string }): Promise<string | null> {
    return await new Promise<string>((resolve) => {
      let value: string = null;
      const layer = new Layer(() => {
        return (
          <InputDialogWidget
            title={options.title}
            desc={options.desc}
            submit={(val) => {
              value = val;
              layer.dispose();
            }}
            cancel={() => {
              layer.dispose();
            }}
            initial={options.initial || ''}
          />
        );
      });
      const l1 = layer.registerListener({
        disposed: () => {
          l1();
          resolve(value);
        }
      });

      this.options.layerStore.addLayer(layer);
    });
  }
}
