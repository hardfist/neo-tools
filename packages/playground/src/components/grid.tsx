import styled from '@emotion/styled';
export const Row = styled.div`
  display: flex;
`;
export const Col = styled.div<{ span: number }>`
  flex: ${(props) => props.span};
`;
