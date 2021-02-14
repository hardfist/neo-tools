import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import { ListItem } from './list';
export type Files = Record<string, string>;

export const FileTree = (props: { files: Files; onSelect: (value: string) => void; selected: string }) => {
  const itemList = Object.entries(props.files).map(([key, value]) => {
    return (
      <ListItem key={key} onClick={(e) => props.onSelect(key)} active={props.selected === key}>
        {key}
      </ListItem>
    );
  });
  return <div>{itemList}</div>;
};
