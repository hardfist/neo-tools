import { css } from '@emotion/react';
export const ListItem = (props: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLElement>;
  active: boolean;
}): React.ReactElement => {
  return (
    <div
      css={css`
        display: inline-flex;
        font: #333;
        background: white;
        cursor: pointer;
        padding: 12px 14px 8px 16px;
        border-bottom: 3px solid ${props.active ? '#e1688c' : 'transparent'};
      `}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
