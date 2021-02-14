import { css } from '@emotion/react';
import esbuildIcon from '../../assets/favicon.svg';
export const Nav = () => {
  return (
    <div
      role="nav"
      css={css`
        padding: 16px;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: #577c8a;
      `}
    >
      <div
        css={css`
          background-image: url(${esbuildIcon});
          background-size: contain;
          height: 24px;
          width: 24px;
          background-repeat: no-repeat;
        `}
      />
      <div
        className="text-white "
        css={css`
          font-size: 18px;
          color: #fff;
          margin-left: 5px;
        `}
      >
        ESBUILD REPL
      </div>
    </div>
  );
};
