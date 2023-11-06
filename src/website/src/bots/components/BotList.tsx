import { Flex } from '@chakra-ui/react'
import { BotCard } from './BotCard'

interface Bot {
  name: string
  color: string
  icon: string
}

interface Props {
  bots: Bot[]
}

export function BotList({ bots }: Props) {
  return (
    <Flex direction="column" gap={1}>
      <Flex gap={8} flexWrap="wrap">
        {bots.map(({ name, color, icon }) => (
          <BotCard key={name} name={name} color={color} icon={icon} />
        ))}
      </Flex>
    </Flex>
  )
}
