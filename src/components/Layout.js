import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styled/GlobalStyles';
import Header from './Header';

const Content = styled.div`
  padding: 1em;
  padding-top: 50px;
`;

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <GlobalStyles />
      <Header />
      <Content>
        {
          children
        }
      </Content>
    </>
  );
};

export default Layout;
