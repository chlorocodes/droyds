import { Flex } from '@chakra-ui/react'
import { BotList } from './BotList'
import { plantBots, fruitBots, otsutsukiBots } from '../bot-settings'

export function BotsPage() {
  return (
    <Flex direction="column" gap={12}>
      <BotList bots={plantBots} />
      <BotList bots={fruitBots} />
      <BotList bots={otsutsukiBots} />
    </Flex>
  )
}
