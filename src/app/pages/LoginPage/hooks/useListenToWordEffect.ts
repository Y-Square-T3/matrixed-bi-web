import { useEffect, useState } from 'react';

type Options = {
  word: string;
  keyTimeout?: number;
};

export const useListenToWordEffect = (
  callback: () => void,
  { word, keyTimeout = 2000 }: Options,
) => {
  const [wordReady, setWordReady] = useState(false);
  const [keyBuffer, setKeyBuffer] = useState('');

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      setKeyBuffer(prev => prev + e.key);
    };

    window.addEventListener('keydown', callback);

    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, []);

  useEffect(() => {
    if (!keyBuffer) {
      return;
    }

    const timeout = setTimeout(() => {
      setKeyBuffer('');
    }, keyTimeout);

    return () => {
      clearTimeout(timeout);
    };
  }, [keyBuffer, keyTimeout]);

  useEffect(() => {
    if (wordReady) {
      return;
    }

    if (word && keyBuffer === word) {
      setWordReady(true);
      callback();
    }
  }, [wordReady, keyBuffer, word, callback]);

  return [wordReady];
};
