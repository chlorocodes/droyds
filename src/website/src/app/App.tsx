import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout, theme } from './layout'
import { NotFoundPage } from './errors'
import { BotsPage } from '../bots'

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route index element={<BotsPage />} />
            <Route path="/bots" element={<BotsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ChakraProvider>
  )
}
