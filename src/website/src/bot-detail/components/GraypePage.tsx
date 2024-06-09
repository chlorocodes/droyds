import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { BotLogo } from './BotLogo'
import { graype } from '../../bots/bot-settings'

interface Author {
  id: string
  username: string
  avatar: string
}

interface Word {
  id: string
  word: string
  author: Author[]
}

interface Story {
  id: string
  words: Word[]
}

export function GraypePage() {
  const [stories, setStories] = useState<string[]>([])

  useEffect(() => {
    async function getStories() {
      try {
        const response = await fetch('/api/stories')
        const responseJson = await response.json()
        const allStories = responseJson.stories as Story[]

        const normalizedStories = allStories.map((story) =>
          story.words
            .map((word) => word.word)
            .join(' ')
            .trim()
        )
        console.log(normalizedStories)
        setStories(normalizedStories)
      } catch {
        setStories([])
      }
    }
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
