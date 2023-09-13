import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Provider from "@/components/Providers";
import {Toaster} from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DocuChat AI',
  description: 'Unlock the power of your documents with DocuChat AI – your intelligent companion for seamless document interaction. Simply upload your PDFs, and let our AI chatbot assist you with tailored answers to your questions, making complex documents a breeze to navigate and understand.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <Provider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
          <Toaster />
        </html>
      </Provider>
    </ClerkProvider>
  )
}
