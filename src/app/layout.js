import { Ubuntu } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  subsets: ['latin'],
  weight: ['400', '700']
})

export const metadata = {
  title: 'Assignment for Front-end Developer - THEMEFISHER',
  description: 'A simple markdown publisher using Next.js and GitHub API'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        cz-shortcut-listen='true'
        className={` ${ubuntu.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
