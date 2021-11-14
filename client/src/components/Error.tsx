import React from 'react'
import { ApolloError } from '@apollo/client'

export interface ErrorProps {
  error: ApolloError
}

const Error: React.FC<ErrorProps> = ({ error }: ErrorProps) => {
  return (
    <pre>
      {error.graphQLErrors.map(({ message }, i) => (
        <span key={i}>{message}</span>
      ))}
    </pre>
  )
}
export default Error
