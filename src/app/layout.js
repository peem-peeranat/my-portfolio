import "./globals.css";
import "./typography.css";
import { Bebas_Neue, DM_Sans, Noto_Sans_Thai } from 'next/font/google';
import { LanguageProvider } from './context/LanguageContext';

const display = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: false,
});

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  adjustFontFallback: false,
});

const thai = Noto_Sans_Thai({
  subsets: ['thai'],
  variable: '--font-thai',
  display: 'swap',
  adjustFontFallback: false,
});

// Keep only each font's own family. Some development bundlers still append
// an Arial fallback despite adjustFontFallback:false; it would take precedence
// over the next script-specific font in our CSS stacks on some platforms.
const fontFamilies = {
  '--font-display': display.style.fontFamily.split(',')[0],
  '--font-body': body.style.fontFamily.split(',')[0],
  '--font-thai': thai.style.fontFamily.split(',')[0],
};

export const metadata = {
  title: 'Peeranat | Full Stack Developer — Enterprise Workflow Systems',
  description: 'Full Stack Developer at Siamraj building E-Flow (PTTGC) and DDMS (KB J Capital) — Next.js, SvelteKit, Elixir/Phoenix, and production workflow platforms.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
  openGraph: {
    title: 'Peeranat | Full Stack Developer',
    description: 'Enterprise document & workflow systems — E-Flow, DDMS, Siamraj.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#151515',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={`${display.variable} ${body.variable} ${thai.variable}`} style={fontFamilies} suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
