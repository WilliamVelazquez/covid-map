import React from 'react';
import styled from 'styled-components';
import CountCard from './CountCard';
import LabelSelect from './LabelSelect';

const Container = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 767px) {
    grid-row-gap: 30px;
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
`;

const SelectContainer = styled.div`
  width: 50%;
  margin-bottom: 25px;
  @media (max-width: 767px) {
    width: 100%;
    /* text-align: center; */
  }
`;

const CountBoard = (props) => {
  const { firstTitle = '', firstCount = '-', secondTitle = '', secondCount = '-', finalTitle = '', finalCount = '-', options = [], value = '', handleChange = null } = props;
  return (
    <>
      <Title>Casos de COVID-19 en la República Mexicana</Title>

      <SelectContainer>
        <LabelSelect data={options} value={value} onChange={handleChange} label='Información a visualizar' />
      </SelectContainer>

      <Container>
        <CountCard title={firstTitle} count={firstCount} color='#017faf' shadow='#08506b' />
        <CountCard title={secondTitle} count={secondCount} color='#ee3840' shadow='#a01218' />
      </Container>
      <br />
      <CountCard title={finalTitle} count={finalCount} color='#01af66' shadow='#057546' />
    </>
  );
};

export default CountBoard;
