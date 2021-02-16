import { FileTree } from '../components/filetree';
import { Editor } from '../components/editor';
import React, { Fragment, useEffect } from 'react';
import { Nav } from '../components/nav';
import { compileMemfs } from '@neotools/bundler';
import { Row, Col } from '../components/grid';
import { toJS, makeAutoObservable, autorun, reaction } from 'mobx';
import { observer, useLocalStore } from 'mobx-react-lite';
import path from 'path-browserify';
import { ListItem } from '../components/list';
import '../utils/worker';
const initialFiles = {
  'main.js': `
  import './style.css'
  import react from 'https://unpkg.com/react@17.0.1/index.js'
  import answer from 'the-answer';
  import * as lib from './lib';
  console.log('lib:',lib);
  console.log('answer:',answer,react);
  `,
  'lib.js': `export const answer = 42`,
  'style.css': 'text\n{ color: red}',
};
type CompileResultType = '.js' | '.css';
const playground = makeAutoObservable({
  files: initialFiles as Record<string, string>,
  selected: Object.keys(initialFiles)[0] ?? '',
  selectedResult: '.js' as CompileResultType,
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
    const result = await compileMemfs(this.files, 'main.js');
    this.updateResult(result);
  },
  updateFileContent(file: string, content: string) {
    this.files[file] = content;
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
  return (
    <div>
      <ListItem onClick={() => playground.updateSelectedResult('.js')} active={playground.selectedResult === '.js'}>
        JS output
      </ListItem>
      <ListItem onClick={() => playground.updateSelectedResult('.css')} active={playground.selectedResult === '.css'}>
        CSS output
      </ListItem>
      <Editor value={playground.selectedResultContent} language={ext2language(playground.selectedResult)} />
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
        onChange={(value) => {
          playground.updateFileContent(playground.selected, value ?? '');
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
