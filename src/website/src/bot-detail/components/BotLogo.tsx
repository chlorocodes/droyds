import { Avatar, Flex, Heading } from '@chakra-ui/react'

interface Props {
  name: string
  icon: string
}

export function BotLogo({ name, icon }: Props) {
  return (
    <Flex direction="column" align="center" gap={2}>
      <Heading textTransform="uppercase" fontSize="xl">
        {name}
      </Heading>
      <Avatar borderWidth={2} name={name} src={icon} boxSize={75} p={2} />
    </Flex>
  )
}
