import { FileTree } from '../components/filetree';
import { Editor } from '../components/editor';
import React, { Fragment, useEffect, useRef } from 'react';
import { Nav } from '../components/nav';
import { css } from '@emotion/react';
import { compileMemfs, Compiler } from '@neotools/bundler';
import { Row, Col } from '../components/grid';
import { toJS, makeAutoObservable, autorun, reaction, action } from 'mobx';
import { observer, useLocalStore } from 'mobx-react-lite';
import path from 'path-browserify';
import { ListItem } from '../components/list';
import html from '../examples/index.html';
import examples from 'glob:../examples/**/*';

import '../utils/worker';
const initialFiles = examples;
type CompileResultType = '.js' | '.css' | '.result';
let compiler: Compiler | null = null;
const playground = makeAutoObservable({
  files: initialFiles as Record<string, string>,
  selected: Object.keys(initialFiles)[0] ?? '',
  selectedResult: '.result' as CompileResultType,
  compileResult: {} as Record<string, string>,

  updateSelected(key: string) {
    this.selected = key;
  },
  updateResult(result: Record<string, string>) {
    this.compileResult = result;
  },
  updateSelectedResult(key: CompileResultType) {
    this.selectedResult = key;
  },
  get jsResult(): string {
    for (const [key, value] of Object.entries(this.compileResult)) {
      if (key.endsWith('.js')) {
        return value;
      }
    }
    return '';
  },
  get cssResult(): string {
    for (const [key, value] of Object.entries(this.compileResult)) {
      if (key.endsWith('.css')) {
        return value;
      }
    }
    return '';
  },
  get selectedResultContent(): string {
    return this.selectedResult === '.js' ? this.jsResult : this.cssResult;
  },
  get currentFile(): string {
    return this.files[this.selected];
  },
  async compile() {
    const context = this;
    if (!compiler) {
      compiler = compileMemfs(this.files, {
        input: 'main.tsx',
        hooks: {
          done(result) {
            const compileResult = {} as Record<string, string>;
            result?.outputFiles?.forEach((x) => {
              compileResult[x.path] = x.text;
            });
            context.updateResult(compileResult);
          },
        },
      });
    }
    compiler.build();
  },
  async updateFileContent(file: string, content: string) {
    this.files[file] = content;
    await compiler?.options.fileSystem.promises.writeFile(file, content);
  },
});
const ext2language = (ext: string) => {
  switch (ext) {
    case '.css':
      return 'css';
    default:
      return 'javascript';
  }
};
const Preview = observer(() => {
  console.log(toJS(playground));
  const iframeRef = useRef<HTMLIFrameElement>(null);
  autorun(() => {
    const code = playground.jsResult;
    iframeRef.current?.contentWindow?.postMessage({ code });
  });
  return (
    <div>
      <ListItem
        onClick={() => playground.updateSelectedResult('.result')}
        active={playground.selectedResult === '.result'}
      >
        Result
      </ListItem>
      <ListItem onClick={() => playground.updateSelectedResult('.js')} active={playground.selectedResult === '.js'}>
        JS output
      </ListItem>
      <ListItem onClick={() => playground.updateSelectedResult('.css')} active={playground.selectedResult === '.css'}>
        CSS output
      </ListItem>
      {(playground.selectedResult === '.js' || playground.selectedResult === '.css') && (
        <Editor value={playground.selectedResultContent} language={ext2language(playground.selectedResult)} />
      )}
      {playground.selectedResult === '.result' && (
        <iframe
          ref={iframeRef}
          srcDoc={html}
          css={css`
            border-width: 0;
            width: 100%;
            height: 100%;
          `}
        />
      )}
    </div>
  );
});
const EditArea = observer(() => {
  return (
    <div className="flex">
      <FileTree
        files={playground.files}
        selected={playground.selected}
        onSelect={(key) => {
          playground.updateSelected(key);
        }}
      />
      <Editor
        onChange={async (value) => {
          await playground.updateFileContent(playground.selected, value ?? '');
          playground.compile();
        }}
        value={playground.currentFile}
        language={ext2language(path.extname(playground.selected))}
      ></Editor>
    </div>
  );
});
export const Playground = observer(() => {
  useEffect(() => {
    playground.compile();
  }, []);
  return (
    <Fragment>
      <Nav />
      <Row>
        <Col span={12}>
          <EditArea />
        </Col>
        <Col span={12}>
          <Preview />
        </Col>
      </Row>
    </Fragment>
  );
});
