import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Ajay Rana — AI Engineer',
  description: 'Personal portfolio of Ajay Rana, an AI Engineer specializing in Generative AI, LLMs, and intelligent systems.',
  keywords: ['AI Engineer', 'Generative AI', 'LLM', 'Machine Learning', 'Ajay Rana'],
  authors: [{ name: 'Ajay Rana' }],
  openGraph: {
    title: 'Ajay Rana — AI Engineer',
    description: 'Personal portfolio of Ajay Rana, an AI Engineer specializing in Generative AI, LLMs, and intelligent systems.',
    url: 'https://ajayrana.in',
    siteName: 'Ajay Rana Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajay Rana — AI Engineer',
    description: 'Personal portfolio of Ajay Rana, an AI Engineer specializing in Generative AI.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-[#0a0a0f] text-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
