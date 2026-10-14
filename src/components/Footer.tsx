import Link from 'next/link';
import { CATEGORIES } from '@/data/products';

const CARE_TIPS = [
  'Hand wash gently in cool water.',
  'Lay flat to dry and reshape.',
  'Want something custom? Send us a message.',
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Yarn &amp; Loop</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-paper/70">
            Small-batch crochet for your home and the people you love, made by hand one stitch at a time.
          </p>
        </div>

        <nav aria-label="Shop">
          <h2 className="font-display text-lg text-marigold">Shop</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link href={`/categories/${category.slug}`} className="text-paper/70 hover:text-paper">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg text-marigold">Care guide</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
            {CARE_TIPS.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-dashed border-paper/25">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-paper/55 sm:px-8">
          © {new Date().getFullYear()} Yarn &amp; Loop Crochet Boutique
        </p>
      </div>
    </footer>
  );
}