import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface ScreenProps {
  children: ReactNode
}

const AdminHeaderWrapper = styled.div`
  background-color: #999;
  color: #fff;
  a {
    font-size: 14px;
    text-decoration: none;
    color: #fff;
  }
`
const AdminHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px 10px;
`
const ContentContainer = styled.div`
  max-width: 1366px;
  margin: 0 auto;
  padding: 40px 60px;
`
const Title = styled.h1`
  margin: 0 0 60px;
  font-size: 28px;
  a {
    text-decoration: none;
    color: #333;
  }
`

const Screen: React.FC<ScreenProps> = ({ children }: ScreenProps) => (
  <>
    <AdminHeaderWrapper>
      <AdminHeaderContainer>
        <Link to={'/articles/create'}>
          <FontAwesomeIcon
            icon={['fas', 'plus']}
            style={{ marginRight: '10px' }}
          />
          New Article
        </Link>
      </AdminHeaderContainer>
    </AdminHeaderWrapper>
    <ContentContainer>
      <Title>
        <Link to={'/'}>Sample Blog Site</Link>
      </Title>
      {children}
    </ContentContainer>
  </>
)

export default Screen
