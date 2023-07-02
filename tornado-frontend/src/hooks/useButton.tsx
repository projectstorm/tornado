import { useEffect, useState } from 'react';

export interface UseButtonOptions {
  action: (event: MouseEvent) => Promise<any>;
  disabled?: boolean;
  instant?: boolean;
}

export const useButton = (props: UseButtonOptions, ref: React.RefObject<HTMLDivElement>) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let busy = false;
    const l = (event: MouseEvent) => {
      event.stopPropagation();
      // debounce
      if (busy || props.disabled) {
        return;
      }
      busy = true;
      const t = setTimeout(() => {
        setLoading(true);
      }, 100);
      props.action(event).finally(() => {
        busy = false;
        clearTimeout(t);
        setLoading(false);
      });
    };
    ref.current.addEventListener(props.instant ? 'mousedown' : 'click', l, { capture: true });
    return () => {
      ref.current?.removeEventListener(props.instant ? 'mousedown' : 'click', l, { capture: true });
    };
  }, [props.action, props.disabled]);
  return { loading };
};
