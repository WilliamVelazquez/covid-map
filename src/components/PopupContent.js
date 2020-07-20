import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: black;
  text-align: left;
  /* margin-left: 15px; */
  margin-top: -25px;
  font-family: inherit;
`;

const Title = styled.h3`
  margin: 0;
  color: #196fa9;
  font-size: 22px;
  text-align: center;
  margin-bottom: 3px;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-gap: 5px;
  font-size: 16px;
	text-align: center;
	grid-template-columns: 1fr 1fr;
`;
const Healthy = styled.div`
  color: #01af66;
  padding: 0px 3px;
  border: 2px solid #01af66;
  /* color: #39b923;
  border: 2px solid #39b923; */
`;

const Unhealthy = styled.div`
  color: #ee3840;
  padding: 0px 3px;
  border: 2px solid #ee3840;
`;

const Text = styled.p`
  margin: 0 !important;
`;

function PopupContent(props) {
  const { title = 'Casos', firstNumber = '-', firstText = 'Sospechosos', secondNumber = '-', secondText = 'Confirmados' } = props;
  return (
    <Container>
      <br />
      <Title>{ title}</Title>
      <InfoContainer>
        <Healthy>
          <strong>{ firstNumber }</strong>
          <Text>{ firstText}</Text>
        </Healthy>
        <Unhealthy>
          <strong>{ secondNumber }</strong>
          <Text>{ secondText}</Text>
        </Unhealthy>
      </InfoContainer>
    </Container>
  );
}

export default PopupContent;
