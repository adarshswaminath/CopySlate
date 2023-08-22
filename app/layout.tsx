import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from "./Components/Navbar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CopySlate',
  description: 'CopySlate is a modern messaging platform that enables users to craft custom messages, generate short-lived sharing links, and enhance conversations with interactive content. Built with Next.js, Tailwind CSS, MongoDB, Prisma, and TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
