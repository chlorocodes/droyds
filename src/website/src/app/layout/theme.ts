import { ThemeConfig, extendTheme } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true
}

export const theme = extendTheme({
  config,
  styles: {
    global: {
      '#root': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      },
      body: {
        bg: '#0D0E0F',
        fontFamily: 'Comfortaa'
      }
    }
  }
})
