import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { Inter } from 'next/font/google'
import CustomCursor from './components/CustomCursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Peeranat | Full Stack Developer — Enterprise Workflow Systems",
  description: "Full Stack Developer at Siamraj building E-Flow (PTTGC) and DDMS (KB J Capital) — Next.js, SvelteKit, Elixir/Phoenix, and production workflow platforms.",
  openGraph: {
    title: "Peeranat | Full Stack Developer",
    description: "Enterprise document & workflow systems — E-Flow, DDMS, Siamraj.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="halloween">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap');
          `}
        </style>

      </head>
      <body className={inter.className}>
        <CustomCursor />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
