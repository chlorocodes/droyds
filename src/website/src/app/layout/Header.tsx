import { Link as RouterLink } from 'react-router-dom'
import { Flex, Link } from '@chakra-ui/react'
import logo from '/logo.svg'

export function Header() {
  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      bg="#111214"
      height="75px"
      padding="1rem"
    >
      <Link as={RouterLink} to="/">
        <img src={logo} />
      </Link>
    </Flex>
  )
}
