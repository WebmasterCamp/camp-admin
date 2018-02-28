import React from 'react'
import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
  0%, 100% { 
    transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
  }
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin: 100px auto;
  animation: ${bounce} 2s infinite ease-in-out;
`

const Bouncer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${bounce} 2s infinite ease-in-out;
  ${props => props.second && 'animation-delay: -1.0s;'};
`

const Container = styled.div`
  display: flex;
  background-color: #404040;
  height: 100%;
  align-items: center;
`

const Loading = props => (
  <Container>
    <Spinner>
      <Bouncer />
      <Bouncer second />
    </Spinner>
  </Container>
)

export default Loading
