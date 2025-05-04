import { useRef } from 'react';

type DebounceEvent = React.ChangeEvent<HTMLInputElement>;

export const useDebounce = <T extends (args: DebounceEvent) => unknown>(cb: T, delay: number) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (args: DebounceEvent) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => cb(args), delay);
  };
};

export default useDebounce;
