// src/app/layout.tsx
import { Providers } from './providers'
import './styles/globals.css'

export const metadata = {
  title: 'News Management',
  description: 'News Management System'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}