import MonacoEditor, { EditorProps } from '@monaco-editor/react';
import React from 'react';
import * as monacoEditor from 'monaco-editor';

import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useState } from 'react';

export const Editor = (props: { value: string; language: string; onChange?: EditorProps['onChange'] }) => {
  return (
    <ErrorBoundary
      FallbackComponent={(props) => {
        return <div className="text-red-500">something went wrong {props.error.message}</div>;
      }}
    >
      <MonacoEditor
        options={{
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 4,
          hover: {
            enabled: false,
          },
          minimap: {
            enabled: false,
          },
        }}
        value={props.value}
        height="90vh"
        language={props.language}
        defaultLanguage="javascript"
        defaultValue=""
        onChange={props.onChange}
      ></MonacoEditor>
    </ErrorBoundary>
  );
};
