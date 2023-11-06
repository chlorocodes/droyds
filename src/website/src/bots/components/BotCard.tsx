import { Card, Flex, Image, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
  name: string
  icon: string
  color: string
}

export function BotCard({ icon, color, name }: Props) {
  return (
    <Link as={RouterLink} to={`/bots/${name.toLowerCase()}`}>
      <Flex direction="column" align="center" gap={1}>
        <Card
          cursor="pointer"
          borderWidth={1}
          borderColor={color}
          borderRadius={4}
          padding="4"
          bg="#1a1d1d"
          _hover={{ background: color }}
        >
          <Image boxSize={75} src={icon} />
        </Card>
        <Text fontWeight="bold" fontSize="sm">
          {name}
        </Text>
      </Flex>
    </Link>
  )
}
