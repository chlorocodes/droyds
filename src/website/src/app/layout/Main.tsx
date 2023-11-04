import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Main({ children }: Props) {
  return (
    <Box as="main" flex="1">
      {children}
    </Box>
  )
}
