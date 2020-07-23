import React from 'react';
import styled from 'styled-components';

const SeparatorLine = styled.hr`
  width: 98%;
  color: white;
  height: 1px;
  border: none;
  margin: 15px 20px;
  margin-top: 20px;
  background-color: white;
  border-top: 6px dotted #dcdcdc;
  @media (max-width: 767px) {
    width: 88%;
  }
`;

function Separator({ width = '98%', size = '6px' }) {
  return (
    <SeparatorLine />
  );
}

export default Separator;
