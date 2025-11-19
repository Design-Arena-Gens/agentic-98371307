import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import { AnimatedLayout } from '@/components/AnimatedLayout';

export const metadata: Metadata = {
  title: 'Kindle Manuscript Maker',
  description: 'Generate Kindle-ready book drafts with an autonomous AI agent.'
};

type RootLayoutProps = {
  children: ReactNode;
};

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} bg-midnight text-slate-100 min-h-screen`}>
        <AnimatedLayout>{children}</AnimatedLayout>
      </body>
    </html>
  );
}
