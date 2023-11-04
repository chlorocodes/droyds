import { ReactNode } from 'react'
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'

interface Props {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
