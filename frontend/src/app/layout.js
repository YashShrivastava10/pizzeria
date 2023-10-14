import Providers from './Provider'
import Footer from './components/Footer'
import Header from './components/Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pizzeria',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex flex-col justify-between h-screen overflow-x-hidden' id="main">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
