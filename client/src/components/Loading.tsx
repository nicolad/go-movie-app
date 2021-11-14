import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
  text-align: center;
`
const Loading: React.FC = () => (
  <Container>
    <FontAwesomeIcon icon={['fas', 'spinner']} color="#ccc" size="2x" spin />
  </Container>
)
export default Loading
