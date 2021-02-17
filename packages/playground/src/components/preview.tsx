import { useEffect } from 'react';

export const Preview = (props: { code: string }) => {
  useEffect(() => {}, [props.code]);
  return <div id="preview-root"></div>;
};
