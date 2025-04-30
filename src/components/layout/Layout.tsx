import styled from 'styled-components';
import Footer from '../common/Footer';
import Headers from '../common/Headers';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode; // React에서 사용할 수있는 모든 렌더링 가능한 요소를 포괄
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      <Headers />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </div>
  );
};

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({theme}) => theme.layout.width.large};
  padding: 20px 0;

  @media screen and ${({theme}) => theme.mediaQuery.mobile} {
    padding: 20px 12px;
  }
`;

export default Layout;
