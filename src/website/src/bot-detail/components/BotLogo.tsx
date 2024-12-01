import { Flex, Heading } from '@chakra-ui/react'

interface Props {
  name: string
}

export function BotLogo({ name }: Props) {
  return (
    <Flex direction="column" align="center" gap={2}>
      <Heading textTransform="uppercase" fontSize="xl">
        {name}
      </Heading>
    </Flex>
  )
}
