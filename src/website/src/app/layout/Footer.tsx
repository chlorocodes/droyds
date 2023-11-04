import { Flex, Text, Link } from '@chakra-ui/react'

export function Footer() {
  return (
    <Flex
      as="footer"
      bg="#0B0C0D"
      p="2rem"
      height="12"
      justify="space-between"
      align="center"
    >
      <Text fontSize="s">© chloro {new Date().getFullYear()}</Text>
      <Flex gap={4}>
        <Link href="https://github.com/chlorocodes/droyds">
          <Text fontSize="xs">Code</Text>
        </Link>
        <Link href="mailto:chlorocodestv@gmail.com">
          <Text fontSize="xs">Contact</Text>
        </Link>
      </Flex>
    </Flex>
  )
}
