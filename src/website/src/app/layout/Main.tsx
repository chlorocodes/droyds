import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Main({ children }: Props) {
  return (
    <Box as="main" display="flex" flex="1" margin="1rem 2rem">
      {children}
    </Box>
  )
}
