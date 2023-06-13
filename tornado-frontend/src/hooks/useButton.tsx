import { useEffect, useState } from 'react';

export interface UseButtonOptions {
  action: (event: MouseEvent) => Promise<any>;
  disabled?: boolean;
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
    ref.current.addEventListener('click', l);
    return () => {
      ref.current?.removeEventListener('click', l);
    };
  }, []);
  return { loading };
};
