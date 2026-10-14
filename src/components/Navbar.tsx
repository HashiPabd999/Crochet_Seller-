'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CATEGORIES } from '@/data/products';

const shortName = (name: string) => name.split('&')[0].trim();

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5">
      <span className="h-8 w-8 rounded-full border-2 border-dashed border-berry bg-marigold" aria-hidden="true" />
      <span className="font-display text-2xl text-ink">Yarn &amp; Loop</span>
    </Link>
  );
}

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="-ml-2 rounded-full p-2 text-ink hover:bg-ink/5 lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Logo onClick={closeMenu} />

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft lg:flex" aria-label="Main">
          {CATEGORIES.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="hover:text-berry">
              {shortName(category.name)}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-paper hover:bg-berry"
          aria-label={`Open bag, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
        >
          <ShoppingBag size={16} />
          <span>Bag</span>
          {totalItems > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-marigold px-1 text-[11px] font-bold text-ink">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-paper px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="grid grid-cols-2 gap-1">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}`}
                  onClick={closeMenu}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-ink hover:bg-ink/5"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}