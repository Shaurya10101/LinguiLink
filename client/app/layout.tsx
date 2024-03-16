import './globals.css'
import AuthContext from './context/AuthContext'

import ToasterContext from './context/ToasterContext'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'LinguiLink',
  description: 'Real time translation website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <Navbar/>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}