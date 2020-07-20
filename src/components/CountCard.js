import React from 'react';
import styled from 'styled-components';

const Count = styled.div`
  color: #fff;
  border: none;
  font-size: 24px;
  padding: 10px 25px;
  text-align: center;
  border-radius: 10px;
  background: ${(props) => props.backgroundColor};
  box-shadow: ${(props) => `0 2px 0 0 ${props.shadowColor}`};
`;

const Text = styled.p`
	margin: 0;
  font-weight: bold;
	text-shadow: 2px 2px 3px #000000;
`;

const Number = styled.p`
	margin: 0;
  font-size: 32px;
  font-weight: bold;
	text-shadow: 2px 2px 3px #000000;
`;

const CountCard = (props) => {
  const { title = '', count = '-', color = '#60ba3b', shadow = '#459d20' } = props;
  return (
    <Count backgroundColor={color} shadowColor={shadow}>
      <Number>{count}</Number>
      <Text>{title}</Text>
    </Count>
  );
};

export default CountCard;
