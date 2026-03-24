import type {Metadata} from 'next';
import { Cinzel, Lora } from 'next/font/google';
import './globals.css'; // Global styles

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export const metadata: Metadata = {
  title: 'Taverna Delivery Setup',
  description: 'Assistente de configuração de delivery com temática de RPG medieval.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
