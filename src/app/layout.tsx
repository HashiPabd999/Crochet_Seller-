import type { Metadata } from 'next';
import { Figtree, Young_Serif } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const sans = Figtree({ subsets: ['latin'], variable: '--font-figtree' });
const display = Young_Serif({ weight: '400', subsets: ['latin'], variable: '--font-young-serif' });

export const metadata: Metadata = {
  title: 'Yarn & Loop | Handcrafted Crochet Boutique',
  description: 'Shop handmade crochet amigurumi, plushies, wearables, bags, and home decor.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}