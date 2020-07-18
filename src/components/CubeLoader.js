import React from 'react';
import styled, { keyframes } from 'styled-components';

const foldCubeKeyFrames = keyframes`
  0%, 10% {
		opacity: 0;
		transform: perspective(136px) rotateX(-180deg);
	}
	25%, 75% {
    opacity: 1;
		transform: perspective(136px) rotateX(0deg);
	}
	90%, 100% {
    opacity: 0;
		transform: perspective(136px) rotateY(180deg);
	}
`;

const Loader = styled.div`
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	z-index: 999;
	position: fixed;
	text-align: center;
  background-color: ${(props) => props.background || 'rgba(0, 0, 0, 0.3)'};
`;

const Container = styled.div`
	top: 50%;
	left: 50%;
  position: absolute;
`;

const CubeContainer = styled.div`
  position:relative;
`;

const Cube = styled.div`
  width: 73px;
	height: 73px;
	margin: 0 auto;
	/*margin-top: 49px;*/
	/*Centered*/
	margin-top: -30px;
	margin-left: -37px;
	position: relative;
	transform: rotateZ(45deg);
`;

const CubePart = styled.div`
  float: left;
	width: 50%;
	height: 50%;
	position: relative;
	transform: scale(1.1);
  &:before {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${(props) => props.color || 'rgb(1,175,102)'};
    animation: ${foldCubeKeyFrames} 2.76s infinite linear both;
    transform-origin: 100% 100%;
  }
`;

// const CubePart1 = styled(CubePart)`
//   transform: scale(1.1) rotateZ(0deg);
// `;
const CubePart2 = styled(CubePart)`
  transform: scale(1.1) rotateZ(90deg);
  &:before {
    animation-delay: 0.35s;
  }
`;
const CubePart3 = styled(CubePart)`
  transform: scale(1.1) rotateZ(180deg);
  &:before {
    animation-delay: 0.69s;
  }
`;
const CubePart4 = styled(CubePart)`
  transform: scale(1.1) rotateZ(270deg);
  &:before {
    animation-delay: 1.04s;
  }
`;

function CubeLoader(props) {
  const { color = '#01af66', background = 'rgba(0, 0, 0, 0.3)', children } = props;
  return (
    <Loader background={background}>
      <Container>
        <CubeContainer>
          <Cube>
            <CubePart color={color} />
            <CubePart2 color={color} />
            <CubePart4 color={color} />
            <CubePart3 color={color} />
          </Cube>
        </CubeContainer>
      </Container>
      {children}
    </Loader>
  );
};

export default CubeLoader;
