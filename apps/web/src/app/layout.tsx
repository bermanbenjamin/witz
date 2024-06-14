import '../styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import { AppProviders } from '@/providers/app-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Witz',
    template: '%s | Witz',
  },
  description: "Livres de qualquer amarra com instituições financeiras ou comissões por ativos específicos.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
            'min-h-screen bg-background font-sans antialiased',
            inter.className
          )}>
          <AppProviders>
          {children}
        </AppProviders>
        </body>
    </html>
  );
}
