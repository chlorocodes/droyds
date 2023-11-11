import { useEffect, useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { BotLogo } from './BotLogo'
import { graype } from '../../bots/bot-settings'

export function GraypePage() {
  const [stories, setStories] = useState<string[]>([])

  useEffect(() => {
    async function getStories() {}
    getStories()
  }, [])

  return (
    <Flex flex="1">
      <Flex
        as="aside"
        bg="black"
        p="1rem 0"
        flexDirection="column"
        width="15rem"
      >
        <BotLogo name={graype.name} icon={graype.icon} />
      </Flex>
    </Flex>
  )
}
