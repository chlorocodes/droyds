import { Flex } from '@chakra-ui/react'
import { BotList } from './BotList'
import { plantBots, fruitBots, otsutsukiBots } from '../bot-settings'

export function BotsPage() {
  return (
    <Flex direction="column" gap={12} margin="1rem 2rem">
      <BotList bots={plantBots} />
      <BotList bots={fruitBots} />
      <BotList bots={otsutsukiBots} />
    </Flex>
  )
}
