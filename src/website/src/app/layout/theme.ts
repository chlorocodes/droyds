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
        fontFamily: 'Open Sans'
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'Varela Round !important'
      }
    }
  }
})
