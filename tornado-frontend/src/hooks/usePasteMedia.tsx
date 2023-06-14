import * as React from 'react';

export interface UsePasteMediaOptions {
  gotMedia: (file: File[]) => any;
}

export const usePasteMedia = (props: UsePasteMediaOptions) => {
  React.useEffect(() => {
    const listener = (event: ClipboardEvent) => {
      if (event.clipboardData.files.length > 0) {
        props.gotMedia(
          Array.from(event.clipboardData.files).filter((file) => {
            return ['image/png', 'image/jpeg'].indexOf(file.type) !== -1;
          })
        );
      }
    };
    window.addEventListener('paste', listener);
    return () => {
      window.removeEventListener('paste', listener);
    };
  });
};
