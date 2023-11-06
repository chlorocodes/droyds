import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout, theme } from './layout'
import { NotFoundPage } from './errors'
import { BotsPage } from '../bots'
import { GraypePage } from '../bot-detail'

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<BotsPage />} />
            <Route path="/bots" element={<BotsPage />} />
            <Route path="/bots/graype" element={<GraypePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  )
}
