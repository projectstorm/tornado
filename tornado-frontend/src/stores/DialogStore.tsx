import * as React from 'react';
import { Layer, LayerStore } from './LayerStore';
import { DialogWidget } from '../widgets/dialog/DialogWidget';
import { ButtonType } from '../widgets/forms/ButtonWidget';

export interface DialogStoreOptions {
  layerStore: LayerStore;
}

export class DialogStore {
  constructor(protected options: DialogStoreOptions) {}

  async showConfirmDialog(options: { title: string; desc: string }): Promise<boolean> {
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
}
